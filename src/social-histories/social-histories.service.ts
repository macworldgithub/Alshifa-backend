// src/social-histories/social-histories.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SocialHistoryDocument,
  SocialHistory,
} from 'src/schemas/social-history.schema';
import { CreateSocialHistoryDto } from './dto/create-social-history.dto';
import { UpdateSocialHistoryDto } from './dto/update-social-history.dto';

@Injectable()
export class SocialHistoriesService {
  constructor(
    @InjectModel(SocialHistory.name)
    private socialHistoryModel: Model<SocialHistoryDocument>,
  ) {}

  async create(
    createSocialHistoryDto: CreateSocialHistoryDto,
  ): Promise<SocialHistoryDocument> {
    const socialHistory = new this.socialHistoryModel(createSocialHistoryDto);
    return socialHistory.save();
  }

  async findByVisit(visitId: string): Promise<SocialHistoryDocument[]> {
    return this.socialHistoryModel.find({ visit: visitId }).exec();
  }

  async update(
    id: string,
    updateSocialHistoryDto: UpdateSocialHistoryDto,
  ): Promise<SocialHistoryDocument | null> {
    return this.socialHistoryModel
      .findByIdAndUpdate(id, updateSocialHistoryDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<SocialHistoryDocument | null> {
    return this.socialHistoryModel.findByIdAndDelete(id).exec();
  }
}
