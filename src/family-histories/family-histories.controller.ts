// src/family-histories/family-histories.controller.ts
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
import { FamilyHistoriesService } from './family-histories.service';
import { CreateFamilyHistoryDto } from './dto/create-family-history.dto';
import { UpdateFamilyHistoryDto } from './dto/update-family-history.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('family-histories')
@Controller('family-histories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FamilyHistoriesController {
  constructor(
    private readonly familyHistoriesService: FamilyHistoriesService,
  ) {}

  @Post()
  @Roles('Admin', 'Doctor', 'Nurse')
  @ApiOperation({ summary: 'Create family history' })
  @ApiResponse({ status: 201, description: 'Family history created' })
  create(@Body() createFamilyHistoryDto: CreateFamilyHistoryDto) {
    return this.familyHistoriesService.create(createFamilyHistoryDto);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Get family histories by visit ID' })
  @ApiResponse({ status: 200, description: 'List of family histories' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.familyHistoriesService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Admin', 'Doctor', 'Nurse')
  @ApiOperation({ summary: 'Update family history by ID' })
  @ApiResponse({ status: 200, description: 'Family history updated' })
  update(
    @Param('id') id: string,
    @Body() updateFamilyHistoryDto: UpdateFamilyHistoryDto,
  ) {
    return this.familyHistoriesService.update(id, updateFamilyHistoryDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete family history by ID' })
  @ApiResponse({ status: 200, description: 'Family history deleted' })
  remove(@Param('id') id: string) {
    return this.familyHistoriesService.remove(id);
  }
}
