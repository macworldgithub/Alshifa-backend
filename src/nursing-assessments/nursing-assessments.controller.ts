// src/nursing-assessments/nursing-assessments.controller.ts
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
import { NursingAssessmentsService } from './nursing-assessments.service';
import { CreateNursingAssessmentDto } from './dto/create-nursing-assessment.dto';
import { UpdateNursingAssessmentDto } from './dto/update-nursing-assessment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('nursing-assessments')
@Controller('nursing-assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class NursingAssessmentsController {
  constructor(
    private readonly nursingAssessmentsService: NursingAssessmentsService,
  ) {}

  @Post()
  @Roles('Admin', 'Nurse')
  @ApiOperation({ summary: 'Create nursing assessment' })
  @ApiResponse({ status: 201, description: 'Assessment created' })
  create(
    @Body() createNursingAssessmentDto: CreateNursingAssessmentDto,
    @Request() req,
  ) {
    return this.nursingAssessmentsService.create(
      createNursingAssessmentDto,
      req.user.userId,
    );
  }

  @Get('visit/:visitId')
  @Roles('Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get nursing assessment by visit ID' })
  @ApiResponse({ status: 200, description: 'Assessment details' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.nursingAssessmentsService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Nurse', 'Admin')
  @ApiOperation({ summary: 'Update nursing assessment by ID' })
  @ApiResponse({ status: 200, description: 'Assessment updated' })
  update(
    @Param('id') id: string,
    @Body() updateNursingAssessmentDto: UpdateNursingAssessmentDto,
  ) {
    return this.nursingAssessmentsService.update(
      id,
      updateNursingAssessmentDto,
    );
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete nursing assessment by ID' })
  @ApiResponse({ status: 200, description: 'Assessment deleted' })
  remove(@Param('id') id: string) {
    return this.nursingAssessmentsService.remove(id);
  }
}
