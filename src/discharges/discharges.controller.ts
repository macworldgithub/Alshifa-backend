// src/discharges/discharges.controller.ts
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
import { DischargesService } from './discharges.service';
import { CreateDischargeDto } from './dto/create-discharge.dto';
import { UpdateDischargeDto } from './dto/update-discharge.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('discharges')
@Controller('discharges')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DischargesController {
  constructor(private readonly dischargesService: DischargesService) {}

  @Post()
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Create discharge record' })
  @ApiResponse({ status: 201, description: 'Discharge created' })
  create(@Body() createDischargeDto: CreateDischargeDto, @Request() req) {
    return this.dischargesService.create(createDischargeDto, req.user.userId);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Get discharge by visit ID' })
  @ApiResponse({ status: 200, description: 'Discharge details' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.dischargesService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Update discharge by ID' })
  @ApiResponse({ status: 200, description: 'Discharge updated' })
  update(
    @Param('id') id: string,
    @Body() updateDischargeDto: UpdateDischargeDto,
  ) {
    return this.dischargesService.update(id, updateDischargeDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete discharge by ID' })
  @ApiResponse({ status: 200, description: 'Discharge deleted' })
  remove(@Param('id') id: string) {
    return this.dischargesService.remove(id);
  }
}
