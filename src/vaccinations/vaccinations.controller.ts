// src/vaccinations/vaccinations.controller.ts
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
import { VaccinationsService } from './vaccinations.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('vaccinations')
@Controller('vaccinations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class VaccinationsController {
  constructor(private readonly vaccinationsService: VaccinationsService) {}

  @Post()
  @Roles('Admin', 'Nurse', 'Doctor')
  @ApiOperation({ summary: 'Create vaccination record' })
  @ApiResponse({ status: 201, description: 'Vaccination created' })
  create(@Body() createVaccinationDto: CreateVaccinationDto, @Request() req) {
    return this.vaccinationsService.create(
      createVaccinationDto,
      req.user.userId,
    );
  }

  @Get('visit/:visitId')
  @Roles('Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get vaccinations by visit ID' })
  @ApiResponse({ status: 200, description: 'List of vaccinations' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.vaccinationsService.findByVisit(visitId);
  }

  @Get(':id')
  @Roles('Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get vaccination by ID' })
  @ApiResponse({ status: 200, description: 'Vaccination details' })
  findOne(@Param('id') id: string) {
    return this.vaccinationsService.findOne(id);
  }

  @Put(':id')
  @Roles('Nurse', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Update vaccination by ID' })
  @ApiResponse({ status: 200, description: 'Vaccination updated' })
  update(
    @Param('id') id: string,
    @Body() updateVaccinationDto: UpdateVaccinationDto,
  ) {
    return this.vaccinationsService.update(id, updateVaccinationDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete vaccination by ID' })
  @ApiResponse({ status: 200, description: 'Vaccination deleted' })
  remove(@Param('id') id: string) {
    return this.vaccinationsService.remove(id);
  }
}
