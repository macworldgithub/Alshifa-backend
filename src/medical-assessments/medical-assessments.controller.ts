// src/medical-assessments/medical-assessments.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MedicalAssessmentsService } from './medical-assessments.service';
import { CreateMedicalAssessmentDto } from './dto/create-medical-assessment.dto';
import { UpdateMedicalAssessmentDto } from './dto/update-medical-assessment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('medical-assessments')
@Controller('medical-assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MedicalAssessmentsController {
  constructor(
    private readonly medicalAssessmentsService: MedicalAssessmentsService,
  ) {}

  @Post()
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Create medical assessment' })
  @ApiResponse({ status: 201, description: 'Assessment created' })
  create(
    @Body() createMedicalAssessmentDto: CreateMedicalAssessmentDto,
    @Request() req,
  ) {
    return this.medicalAssessmentsService.create(
      createMedicalAssessmentDto,
      req.user.userId,
    );
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Get medical assessment by visit ID' })
  @ApiResponse({ status: 200, description: 'Assessment details' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.medicalAssessmentsService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Update medical assessment by ID' })
  @ApiResponse({ status: 200, description: 'Assessment updated' })
  update(
    @Param('id') id: string,
    @Body() updateMedicalAssessmentDto: UpdateMedicalAssessmentDto,
  ) {
    return this.medicalAssessmentsService.update(
      id,
      updateMedicalAssessmentDto,
    );
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete medical assessment by ID' })
  @ApiResponse({ status: 200, description: 'Assessment deleted' })
  remove(@Param('id') id: string) {
    return this.medicalAssessmentsService.remove(id);
  }
}
