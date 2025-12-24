// src/allergies/allergies.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('allergies')
@Controller('allergies')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Post()
  @Roles('Doctor', 'Nurse')
  @ApiOperation({ summary: 'Create allergy' })
  @ApiResponse({ status: 201, description: 'Allergy created' })
  create(@Body() createAllergyDto: CreateAllergyDto) {
    return this.allergiesService.create(createAllergyDto);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Get allergies by visit ID' })
  @ApiResponse({ status: 200, description: 'List of allergies' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.allergiesService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Doctor', 'Nurse')
  @ApiOperation({ summary: 'Update allergy by ID' })
  @ApiResponse({ status: 200, description: 'Allergy updated' })
  update(@Param('id') id: string, @Body() updateAllergyDto: UpdateAllergyDto) {
    return this.allergiesService.update(id, updateAllergyDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete allergy by ID' })
  @ApiResponse({ status: 200, description: 'Allergy deleted' })
  remove(@Param('id') id: string) {
    return this.allergiesService.remove(id);
  }
}
