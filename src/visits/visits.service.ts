// src/visits/visits.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitDocument, Visit } from 'src/schemas/visit.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { TokensService } from '../tokens/tokens.service';
import { PatientDocument } from 'src/schemas/patient.schema';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
    private tokensService: TokensService,
  ) {}

  async create(
    createVisitDto: CreateVisitDto,
    userId: string,
  ): Promise<VisitDocument> {
    const visit = new this.visitModel({
      ...createVisitDto,
      createdBy: userId,
    });
    const savedVisit = await visit.save();
    const populatedVisit = await this.visitModel
      .findById(savedVisit._id)
      .populate<{ patient: PatientDocument }>('patient')
      .populate<{ doctorAssigned: UserDocument }>('doctorAssigned')
      .exec();
    if (!populatedVisit) {
      throw new Error('Visit not found after creation');
    }
    const patientName = populatedVisit.patient.name;
    const doctorName = populatedVisit.doctorAssigned.fullName;
    await this.tokensService.createForVisit(
      savedVisit._id.toString(),
      patientName,
      doctorName,
    );
    return savedVisit;
  }

  async findAll(): Promise<VisitDocument[]> {
    return this.visitModel
      .find()
      .populate('patient')
      .populate('doctorAssigned')
      .exec();
  }

  async findOne(id: string): Promise<VisitDocument | null> {
    return this.visitModel
      .findById(id)
      .populate('patient')
      .populate('doctorAssigned')
      .exec();
  }
  async findByPatient(patientId: string): Promise<VisitDocument[]> {
    return this.visitModel
      .find({ patient: patientId })
      .populate('patient')
      .populate('doctorAssigned')
      .exec();
  }
  async update(
    id: string,
    updateVisitDto: UpdateVisitDto,
  ): Promise<VisitDocument | null> {
    return this.visitModel
      .findByIdAndUpdate(id, updateVisitDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<VisitDocument | null> {
    return this.visitModel.findByIdAndDelete(id).exec();
  }

  async callNextToken(doctorId: string): Promise<any> {
    const visit = await this.visitModel
      .findOne({ doctorAssigned: doctorId, visitStatus: 'Waiting' })
      .sort('createdAt');
    if (visit) {
      await this.tokensService.callToken(visit._id.toString());
      visit.visitStatus = 'With Doctor';
      await visit.save();
      return visit;
    }
    return null;
  }
  async getAppointmentStats(): Promise<any> {
    const stats = await this.visitModel.aggregate([
      {
        $group: {
          _id: '$visitStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const mappedStats = {
      Booked: 0,
      Arrived: 0,
      Cancelled: 0,
      'No-Show': 0,
    };

    stats.forEach((s) => {
      if (s._id === 'Cancelled') {
        mappedStats.Cancelled = s.count;
      } else {
        mappedStats.Booked += s.count;
      }

      if (
        [
          'Under Assessment',
          'With Doctor',
          'In Treatment',
          'Completed',
        ].includes(s._id)
      ) {
        mappedStats.Arrived += s.count;
      }

      if (s._id === 'Waiting') {
        mappedStats['No-Show'] = s.count;
      }
    });

    return mappedStats;
  }
  async getStatusCounts(): Promise<any> {
    const stats = await this.visitModel.aggregate([
      {
        $group: {
          _id: {
            status: '$visitStatus',
            payment: '$paymentRecorded',
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const mappedStats = {
      Waiting: 0,
      'Nursing Done': 0,
      'Dr. Done': 0,
      Billed: 0,
    };

    stats.forEach((s) => {
      const status = s._id.status;
      const payment = s._id.payment;

      if (status === 'Waiting') {
        mappedStats.Waiting += s.count;
      }

      if (status === 'Under Assessment') {
        mappedStats['Nursing Done'] += s.count;
      }

      if (['With Doctor', 'In Treatment'].includes(status)) {
        mappedStats['Dr. Done'] += s.count;
      }

      if (status === 'Completed' && payment === 'Yes') {
        mappedStats.Billed += s.count;
      }
    });

    return mappedStats;
  }
}
