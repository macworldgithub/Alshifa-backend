// src/ecgs/ecgs.controller.ts
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
import { EcgsService } from './ecgs.service';
import { CreateEcgDto } from './dto/create-ecg.dto';
import { UpdateEcgDto } from './dto/update-ecg.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('ecgs')
@Controller('ecgs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EcgsController {
  constructor(private readonly ecgsService: EcgsService) {}

  @Post()
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Create ECG record' })
  @ApiResponse({ status: 201, description: 'ECG created' })
  create(@Body() createEcgDto: CreateEcgDto) {
    return this.ecgsService.create(createEcgDto);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Get ECG by visit ID' })
  @ApiResponse({ status: 200, description: 'ECG details' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.ecgsService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Update ECG by ID' })
  @ApiResponse({ status: 200, description: 'ECG updated' })
  update(@Param('id') id: string, @Body() updateEcgDto: UpdateEcgDto) {
    return this.ecgsService.update(id, updateEcgDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete ECG by ID' })
  @ApiResponse({ status: 200, description: 'ECG deleted' })
  remove(@Param('id') id: string) {
    return this.ecgsService.remove(id);
  }
}
