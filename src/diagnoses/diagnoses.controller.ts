// src/diagnoses/diagnoses.controller.ts
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
  Query,
} from '@nestjs/common';
import { DiagnosesService } from './diagnoses.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
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

@ApiTags('diagnoses')
@Controller('diagnoses')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  @Post()
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Create diagnosis' })
  @ApiResponse({ status: 201, description: 'Diagnosis created' })
  create(@Body() createDiagnosisDto: CreateDiagnosisDto, @Request() req) {
    return this.diagnosesService.create(createDiagnosisDto, req.user.userId);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Get diagnosis by visit ID' })
  @ApiResponse({ status: 200, description: 'Diagnosis details' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.diagnosesService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Update diagnosis by ID' })
  @ApiResponse({ status: 200, description: 'Diagnosis updated' })
  update(
    @Param('id') id: string,
    @Body() updateDiagnosisDto: UpdateDiagnosisDto,
  ) {
    return this.diagnosesService.update(id, updateDiagnosisDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete diagnosis by ID' })
  @ApiResponse({ status: 200, description: 'Diagnosis deleted' })
  remove(@Param('id') id: string) {
    return this.diagnosesService.remove(id);
  }
  @Get('diseases')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Search diseases' })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'List of diseases' })
  searchDiseases(@Query('search') search: string) {
    return this.diagnosesService.searchDiseases(search);
  }
}
