// // src/patients/patients.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { PatientDocument, Patient } from 'src/schemas/patient.schema';
// import { CreatePatientDto } from './dto/create-patient.dto';
// import { UpdatePatientDto } from './dto/update-patient.dto';

// @Injectable()
// export class PatientsService {
//   constructor(
//     @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
//   ) {}

//   async create(createPatientDto: CreatePatientDto): Promise<PatientDocument> {
//     const patient = new this.patientModel(createPatientDto);
//     return patient.save();
//   }

//   async findAll(): Promise<PatientDocument[]> {
//     return this.patientModel.find().exec();
//   }

//   async findOne(id: string): Promise<PatientDocument | null> {
//     return this.patientModel.findById(id).exec();
//   }

//   async update(
//     id: string,
//     updatePatientDto: UpdatePatientDto,
//   ): Promise<PatientDocument | null> {
//     return this.patientModel
//       .findByIdAndUpdate(id, updatePatientDto, { new: true })
//       .exec();
//   }

//   async remove(id: string): Promise<PatientDocument | null> {
//     return this.patientModel.findByIdAndDelete(id).exec();
//   }
// }

// src/patients/patients.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientDocument, Patient } from 'src/schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<PatientDocument> {
    const patient = new this.patientModel(createPatientDto);
    return patient.save();
  }

  async findAll(search?: string, date?: string): Promise<PatientDocument[]> {
    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (date) {
      query.dob = date;
    }
    return this.patientModel.find(query).exec();
  }

  async findOne(id: string): Promise<PatientDocument | null> {
    return this.patientModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<PatientDocument | null> {
    return this.patientModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PatientDocument | null> {
    return this.patientModel.findByIdAndDelete(id).exec();
  }
}