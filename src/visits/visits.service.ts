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
}
