// src/allergies/allergies.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Allergy, AllergyDocument } from 'src/schemas/allergy.schema';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

@Injectable()
export class AllergiesService {
  constructor(
    @InjectModel(Allergy.name)
    private allergyModel: Model<AllergyDocument>,
  ) {}

  async create(createAllergyDto: CreateAllergyDto): Promise<AllergyDocument> {
    const allergy = new this.allergyModel(createAllergyDto);
    return allergy.save();
  }

  async findByVisit(visitId: string): Promise<AllergyDocument[]> {
    return this.allergyModel.find({ visit: visitId }).exec();
  }

  async update(
    id: string,
    updateAllergyDto: UpdateAllergyDto,
  ): Promise<AllergyDocument | null> {
    return this.allergyModel
      .findByIdAndUpdate(id, updateAllergyDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<AllergyDocument | null> {
    return this.allergyModel.findByIdAndDelete(id).exec();
  }
}
