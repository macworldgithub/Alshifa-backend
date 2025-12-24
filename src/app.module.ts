import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { VisitsModule } from './visits/visits.module';
import { NursingAssessmentsModule } from './nursing-assessments/nursing-assessments.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { VaccinationsModule } from './vaccinations/vaccinations.module';
import { DiagnosesModule } from './diagnoses/diagnoses.module';
import { MedicalAssessmentsModule } from './medical-assessments/medical-assessments.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { MedicinesModule } from './medicines/medicines.module';
import { NotesModule } from './notes/notes.module';
import { EcgsModule } from './ecgs/ecgs.module';
import { PaymentsModule } from './payments/payments.module';
import { TokensModule } from './tokens/tokens.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MastersModule } from './masters/masters.module';
import { FileUploadsModule } from './file-uploads/file-uploads.module';
import { DischargesModule } from './discharges/discharges.module';
import { FamilyHistoriesModule } from './family-histories/family-histories.module';
import { AllergiesModule } from './allergies/allergies.module';
import { SocialHistoriesModule } from './social-histories/social-histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),

    AuthModule,
    UsersModule,
    PatientsModule,
    VisitsModule,
    NursingAssessmentsModule,
    ComplaintsModule,
    VaccinationsModule,
    DiagnosesModule,
    MedicalAssessmentsModule,
    TreatmentsModule,
    MedicinesModule,
    NotesModule,
    EcgsModule,
    PaymentsModule,
    TokensModule,
    FavoritesModule,
    MastersModule,
    FileUploadsModule,
    DischargesModule,
    FamilyHistoriesModule,
    AllergiesModule,
    SocialHistoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
