// src/diagnoses/diagnoses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiagnosisDocument, Diagnosis } from 'src/schemas/diagnosis.schema';
import { DiseaseDocument, Disease } from 'src/schemas/disease.schema'; // Assuming the schema is named Disease
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Injectable()
export class DiagnosesService {
  constructor(
    @InjectModel(Diagnosis.name)
    private diagnosisModel: Model<DiagnosisDocument>,
    @InjectModel(Disease.name)
    private diseaseModel: Model<DiseaseDocument>,
  ) {}

  async create(
    createDiagnosisDto: CreateDiagnosisDto,
    userId: string,
  ): Promise<DiagnosisDocument> {
    const diagnosis = new this.diagnosisModel({
      ...createDiagnosisDto,
      createdBy: userId,
    });
    return diagnosis.save();
  }

  async findByVisit(visitId: string): Promise<DiagnosisDocument | null> {
    return this.diagnosisModel.findOne({ visit: visitId }).exec();
  }

  async update(
    id: string,
    updateDiagnosisDto: UpdateDiagnosisDto,
  ): Promise<DiagnosisDocument | null> {
    return this.diagnosisModel
      .findByIdAndUpdate(id, updateDiagnosisDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<DiagnosisDocument | null> {
    return this.diagnosisModel.findByIdAndDelete(id).exec();
  }
  async searchDiseases(
    search: string = '',
  ): Promise<{ code: string; name: string }[]> {
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    return this.diseaseModel
      .find(query)
      .select('code name')
      .lean() // ✅ makes it faster
      .exec();
  }
  async getCommon(): Promise<any[]> {
    return this.diagnosisModel
      .aggregate([
        { $group: { _id: '$finalDiagnosis', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 7 },
        { $project: { code: '$_id', value: '$count', _id: 0 } },
      ])
      .exec();
  }
}
