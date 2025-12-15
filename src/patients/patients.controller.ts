// // src/patients/patients.controller.ts
// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { PatientsService } from './patients.service';
// import { CreatePatientDto } from './dto/create-patient.dto';
// import { UpdatePatientDto } from './dto/update-patient.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiBearerAuth,
// } from '@nestjs/swagger';

// @ApiTags('patients')
// @Controller('patients')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @ApiBearerAuth()
// export class PatientsController {
//   constructor(private readonly patientsService: PatientsService) {}

//   @Post()
//   @Roles('Receptionist', 'Admin')
//   @ApiOperation({ summary: 'Create a new patient' })
//   @ApiResponse({ status: 201, description: 'Patient created' })
//   create(@Body() createPatientDto: CreatePatientDto) {
//     return this.patientsService.create(createPatientDto);
//   }

//   @Get()
//   @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
//   @ApiOperation({ summary: 'Get all patients' })
//   @ApiResponse({ status: 200, description: 'List of patients' })
//   findAll() {
//     return this.patientsService.findAll();
//   }

//   @Get(':id')
//   @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
//   @ApiOperation({ summary: 'Get patient by ID' })
//   @ApiResponse({ status: 200, description: 'Patient details' })
//   findOne(@Param('id') id: string) {
//     return this.patientsService.findOne(id);
//   }

//   @Put(':id')
//   @Roles('Receptionist', 'Admin')
//   @ApiOperation({ summary: 'Update patient by ID' })
//   @ApiResponse({ status: 200, description: 'Patient updated' })
//   update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
//     return this.patientsService.update(id, updatePatientDto);
//   }

//   @Delete(':id')
//   @Roles('Admin')
//   @ApiOperation({ summary: 'Delete patient by ID' })
//   @ApiResponse({ status: 200, description: 'Patient deleted' })
//   remove(@Param('id') id: string) {
//     return this.patientsService.remove(id);
//   }
// }

// src/patients/patients.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('patients')
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @Roles('Receptionist', 'Admin')
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient created' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'List of patients' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'date', required: false, type: String })
  findAll(@Query('search') search: string, @Query('date') date: string) {
    return this.patientsService.findAll(search, date);
  }

  @Get(':id')
  @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiResponse({ status: 200, description: 'Patient details' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Put(':id')
  @Roles('Receptionist', 'Admin')
  @ApiOperation({ summary: 'Update patient by ID' })
  @ApiResponse({ status: 200, description: 'Patient updated' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete patient by ID' })
  @ApiResponse({ status: 200, description: 'Patient deleted' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}