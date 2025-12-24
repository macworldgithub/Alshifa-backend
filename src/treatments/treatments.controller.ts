// src/treatments/treatments.controller.ts
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
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('treatments')
@Controller('treatments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Create treatment' })
  @ApiResponse({ status: 201, description: 'Treatment created' })
  create(@Body() createTreatmentDto: CreateTreatmentDto, @Request() req) {
    return this.treatmentsService.create(createTreatmentDto, req.user.userId);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Get treatments by visit ID' })
  @ApiResponse({ status: 200, description: 'List of treatments' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.treatmentsService.findByVisit(visitId);
  }

  @Get(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Get treatment by ID' })
  @ApiResponse({ status: 200, description: 'Treatment details' })
  findOne(@Param('id') id: string) {
    return this.treatmentsService.findOne(id);
  }

  @Put(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Update treatment by ID' })
  @ApiResponse({ status: 200, description: 'Treatment updated' })
  update(
    @Param('id') id: string,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ) {
    return this.treatmentsService.update(id, updateTreatmentDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete treatment by ID' })
  @ApiResponse({ status: 200, description: 'Treatment deleted' })
  remove(@Param('id') id: string) {
    return this.treatmentsService.remove(id);
  }
}
