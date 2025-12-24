// src/visits/visits.controller.ts
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
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('visits')
@Controller('visits')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @Roles('Receptionist', 'Admin')
  @ApiOperation({ summary: 'Create a new visit' })
  @ApiResponse({ status: 201, description: 'Visit created' })
  create(@Body() createVisitDto: CreateVisitDto, @Request() req) {
    return this.visitsService.create(createVisitDto, req.user.userId);
  }

  @Get()
  @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get all visits' })
  @ApiResponse({ status: 200, description: 'List of visits' })
  findAll() {
    return this.visitsService.findAll();
  }
  @Get('appointment-stats')
  @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get appointment stats' })
  @ApiResponse({ status: 200, description: 'Appointment stats' })
  getAppointmentStats() {
    return this.visitsService.getAppointmentStats();
  }

  @Get('status-counts')
  @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get status counts' })
  @ApiResponse({ status: 200, description: 'Status counts' })
  getStatusCounts() {
    return this.visitsService.getStatusCounts();
  }
  @Get('patient/:patientId')
  @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get all visits for a patient' })
  @ApiResponse({ status: 200, description: 'List of visits for the patient' })
  findByPatient(@Param('patientId') patientId: string) {
    return this.visitsService.findByPatient(patientId);
  }
  @Get(':id')
  @Roles('Receptionist', 'Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get visit by ID' })
  @ApiResponse({ status: 200, description: 'Visit details' })
  findOne(@Param('id') id: string) {
    return this.visitsService.findOne(id);
  }

  @Put(':id')
  @Roles('Receptionist', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Update visit by ID' })
  @ApiResponse({ status: 200, description: 'Visit updated' })
  update(@Param('id') id: string, @Body() updateVisitDto: UpdateVisitDto) {
    return this.visitsService.update(id, updateVisitDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete visit by ID' })
  @ApiResponse({ status: 200, description: 'Visit deleted' })
  remove(@Param('id') id: string) {
    return this.visitsService.remove(id);
  }

  @Post('call-next-token')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Call next token for doctor' })
  @ApiResponse({ status: 200, description: 'Next visit called' })
  callNextToken(@Request() req) {
    return this.visitsService.callNextToken(req.user.userId);
  }
}
