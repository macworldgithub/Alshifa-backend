// src/complaints/complaints.controller.ts
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
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('complaints')
@Controller('complaints')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  @Roles("Admin",'Nurse', 'Doctor')
  @ApiOperation({ summary: 'Create complaint' })
  @ApiResponse({ status: 201, description: 'Complaint created' })
  create(@Body() createComplaintDto: CreateComplaintDto, @Request() req) {
    return this.complaintsService.create(createComplaintDto, req.user.userId);
  }

  @Get('visit/:visitId')
  @Roles('Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get complaint by visit ID' })
  @ApiResponse({ status: 200, description: 'Complaint details' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.complaintsService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Nurse', 'Doctor')
  @ApiOperation({ summary: 'Update complaint by ID' })
  @ApiResponse({ status: 200, description: 'Complaint updated' })
  update(
    @Param('id') id: string,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    return this.complaintsService.update(id, updateComplaintDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete complaint by ID' })
  @ApiResponse({ status: 200, description: 'Complaint deleted' })
  remove(@Param('id') id: string) {
    return this.complaintsService.remove(id);
  }
}
