// // src/medicines/medicines.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { MedicineDocument, Medicine } from 'src/schemas/medicine.schema';
// import { CreateMedicineDto } from './dto/create-medicine.dto';
// import { UpdateMedicineDto } from './dto/update-medicine.dto';

// @Injectable()
// export class MedicinesService {
//   constructor(
//     @InjectModel(Medicine.name) private medicineModel: Model<MedicineDocument>,
//   ) {}

//   async create(
//     createMedicineDto: CreateMedicineDto,
//   ): Promise<MedicineDocument> {
//     const medicine = new this.medicineModel(createMedicineDto);
//     return medicine.save();
//   }

//   async findByVisit(visitId: string): Promise<MedicineDocument[]> {
//     return this.medicineModel.find({ visit: visitId }).exec();
//   }

//   async findOne(id: string): Promise<MedicineDocument | null> {
//     return this.medicineModel.findById(id).exec();
//   }

//   async update(
//     id: string,
//     updateMedicineDto: UpdateMedicineDto,
//   ): Promise<MedicineDocument | null> {
//     return this.medicineModel
//       .findByIdAndUpdate(id, updateMedicineDto, { new: true })
//       .exec();
//   }

//   async remove(id: string): Promise<MedicineDocument | null> {
//     return this.medicineModel.findByIdAndDelete(id).exec();
//   }
// }

// src/medicines/medicines.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicineDocument, Medicine } from 'src/schemas/medicine.schema';
import { MedicineConceptDocument } from 'src/schemas/medicine-concept.schema';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectModel(Medicine.name) private medicineModel: Model<MedicineDocument>,
    @InjectModel('MedicineConcept')
    private medicineConceptModel: Model<MedicineConceptDocument>,
    private readonly httpService: HttpService,
  ) {}

  async create(
    createMedicineDto: CreateMedicineDto,
  ): Promise<MedicineDocument> {
    const medicine = new this.medicineModel(createMedicineDto);
    return medicine.save();
  }

  async findByVisit(visitId: string): Promise<MedicineDocument[]> {
    return this.medicineModel.find({ visit: visitId }).exec();
  }

  async findOne(id: string): Promise<MedicineDocument | null> {
    return this.medicineModel.findById(id).exec();
  }

  async update(
    id: string,
    updateMedicineDto: UpdateMedicineDto,
  ): Promise<MedicineDocument | null> {
    return this.medicineModel
      .findByIdAndUpdate(id, updateMedicineDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<MedicineDocument | null> {
    return this.medicineModel.findByIdAndDelete(id).exec();
  }

  async getAllClasses(): Promise<any> {
    const response = this.httpService.get(
      'https://rxnav.nlm.nih.gov/REST/rxclass/allClasses.json',
    );
    const data = await lastValueFrom(response);
    return data.data;
  }

  // async getAllConcepts(search?: string): Promise<any[]> {
  //   const query = search ? { fullName: { $regex: search, $options: 'i' } } : {};
  //   return this.medicineConceptModel.find(query).exec();
  // }
  async populateConcepts(): Promise<any> {
    const response = this.httpService.get(
      'https://rxnav.nlm.nih.gov/REST/RxTerms/allconcepts.json',
    );
    const data = await lastValueFrom(response);
    const minConcepts = data.data.minConceptGroup.minConcept;
    await this.medicineConceptModel.insertMany(minConcepts);
    return { message: 'Concepts populated successfully' };
  }

  async getAllConcepts(search?: string): Promise<any[]> {
    const query = search ? { fullName: { $regex: search, $options: 'i' } } : {};
    return this.medicineConceptModel.find(query).select('fullName').lean();
  }
  async getCommonMedicines(
    limit: number = 7,
  ): Promise<{ name: string; value: number }[]> {
    const result = await this.medicineModel
      .aggregate([
        {
          $group: {
            _id: '$medicineName', // Group by medicineName
            count: { $sum: 1 }, // Count occurrences
          },
        },
        { $sort: { count: -1 } }, // Sort by most prescribed first
        { $limit: limit }, // Limit to top N (default 7)
        {
          $project: {
            _id: 0,
            name: '$_id', // Rename _id to 'name'
            value: '$count', // Rename count to 'value'
          },
        },
      ])
      .exec();

    // Optional: Return fallback data if no prescriptions exist yet
    // if (result.length === 0) {
    //   return [
    //     { name: 'Paracetamol', value: 85 },
    //     { name: 'Amoxicillin', value: 72 },
    //     { name: 'Ibuprofen', value: 68 },
    //     { name: 'Metformin', value: 55 },
    //     { name: 'Omeprazole', value: 48 },
    //     { name: 'Amlodipine', value: 42 },
    //     { name: 'Atorvastatin', value: 38 },
    //   ];
    // }

    return result;
  }
}
