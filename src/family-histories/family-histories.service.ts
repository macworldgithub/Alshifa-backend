// src/family-histories/family-histories.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FamilyHistoryDocument,
  FamilyHistory,
} from 'src/schemas/family-history.schema';
import { CreateFamilyHistoryDto } from './dto/create-family-history.dto';
import { UpdateFamilyHistoryDto } from './dto/update-family-history.dto';

@Injectable()
export class FamilyHistoriesService {
  constructor(
    @InjectModel(FamilyHistory.name)
    private familyHistoryModel: Model<FamilyHistoryDocument>,
  ) {}

  async create(
    createFamilyHistoryDto: CreateFamilyHistoryDto,
  ): Promise<FamilyHistoryDocument> {
    const familyHistory = new this.familyHistoryModel(createFamilyHistoryDto);
    return familyHistory.save();
  }

  async findByVisit(visitId: string): Promise<FamilyHistoryDocument[]> {
    return this.familyHistoryModel.find({ visit: visitId }).exec();
  }

  async update(
    id: string,
    updateFamilyHistoryDto: UpdateFamilyHistoryDto,
  ): Promise<FamilyHistoryDocument | null> {
    return this.familyHistoryModel
      .findByIdAndUpdate(id, updateFamilyHistoryDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<FamilyHistoryDocument | null> {
    return this.familyHistoryModel.findByIdAndDelete(id).exec();
  }
}
