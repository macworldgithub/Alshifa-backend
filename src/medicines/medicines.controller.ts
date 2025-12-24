// // src/medicines/medicines.controller.ts
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
// import { MedicinesService } from './medicines.service';
// import { CreateMedicineDto } from './dto/create-medicine.dto';
// import { UpdateMedicineDto } from './dto/update-medicine.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiBearerAuth,
// } from '@nestjs/swagger';

// @ApiTags('medicines')
// @Controller('medicines')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @ApiBearerAuth()
// export class MedicinesController {
//   constructor(private readonly medicinesService: MedicinesService) {}

//   @Post()
//   @Roles('Doctor')
//   @ApiOperation({ summary: 'Create medicine prescription' })
//   @ApiResponse({ status: 201, description: 'Medicine created' })
//   create(@Body() createMedicineDto: CreateMedicineDto) {
//     return this.medicinesService.create(createMedicineDto);
//   }

//   @Get('visit/:visitId')
//   @Roles('Doctor', 'Pharmacist', 'Admin')
//   @ApiOperation({ summary: 'Get medicines by visit ID' })
//   @ApiResponse({ status: 200, description: 'List of medicines' })
//   findByVisit(@Param('visitId') visitId: string) {
//     return this.medicinesService.findByVisit(visitId);
//   }

//   @Get(':id')
//   @Roles('Doctor', 'Pharmacist', 'Admin')
//   @ApiOperation({ summary: 'Get medicine by ID' })
//   @ApiResponse({ status: 200, description: 'Medicine details' })
//   findOne(@Param('id') id: string) {
//     return this.medicinesService.findOne(id);
//   }

//   @Put(':id')
//   @Roles('Doctor')
//   @ApiOperation({ summary: 'Update medicine by ID' })
//   @ApiResponse({ status: 200, description: 'Medicine updated' })
//   update(
//     @Param('id') id: string,
//     @Body() updateMedicineDto: UpdateMedicineDto,
//   ) {
//     return this.medicinesService.update(id, updateMedicineDto);
//   }

//   @Delete(':id')
//   @Roles('Admin')
//   @ApiOperation({ summary: 'Delete medicine by ID' })
//   @ApiResponse({ status: 200, description: 'Medicine deleted' })
//   remove(@Param('id') id: string) {
//     return this.medicinesService.remove(id);
//   }
// }

// src/medicines/medicines.controller.ts
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
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
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

@ApiTags('medicines')
@Controller('medicines')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MedicinesController {
  constructor(private readonly medicinesService: MedicinesService) {}
  @Get('all-classes')
  @Roles('Doctor', 'Pharmacist', 'Admin')
  @ApiOperation({ summary: 'Get all drug classes from RxNav' })
  @ApiResponse({ status: 200, description: 'All drug classes' })
  getAllClasses() {
    return this.medicinesService.getAllClasses();
  }

  //  @Post('populate-concepts')
  //   @Roles('Admin')
  //   @ApiOperation({ summary: 'Populate medicine concepts from RxNav' })
  //   @ApiResponse({ status: 201, description: 'Concepts populated' })
  //   populateConcepts() {
  //     return this.medicinesService.populateConcepts();
  //   }

  @Get('all-concepts')
  @Roles('Doctor', 'Pharmacist', 'Admin')
  @ApiOperation({ summary: 'Get all or searched RxTerms concepts from DB' })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'All RxTerms concepts' })
  getAllConcepts(@Query('search') search: string) {
    return this.medicinesService.getAllConcepts(search);
  }
  @Get('common')
  @Roles('Doctor', 'Pharmacist', 'Admin')
  @ApiOperation({ summary: 'Get most commonly prescribed medicines' })
  @ApiResponse({
    status: 200,
    description: 'Top prescribed medicines with counts',
    type: [Object],
  })
  async getCommonMedicines() {
    return this.medicinesService.getCommonMedicines();
  }
  @Post()
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Create medicine prescription' })
  @ApiResponse({ status: 201, description: 'Medicine created' })
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicinesService.create(createMedicineDto);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Pharmacist', 'Admin')
  @ApiOperation({ summary: 'Get medicines by visit ID' })
  @ApiResponse({ status: 200, description: 'List of medicines' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.medicinesService.findByVisit(visitId);
  }

  @Get(':id')
  @Roles('Doctor', 'Pharmacist', 'Admin')
  @ApiOperation({ summary: 'Get medicine by ID' })
  @ApiResponse({ status: 200, description: 'Medicine details' })
  findOne(@Param('id') id: string) {
    return this.medicinesService.findOne(id);
  }

  @Put(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Update medicine by ID' })
  @ApiResponse({ status: 200, description: 'Medicine updated' })
  update(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicinesService.update(id, updateMedicineDto);
  }

  @Delete(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Delete medicine by ID' })
  @ApiResponse({ status: 200, description: 'Medicine deleted' })
  remove(@Param('id') id: string) {
    return this.medicinesService.remove(id);
  }
}
