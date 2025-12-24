// src/social-histories/social-histories.controller.ts
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
import { SocialHistoriesService } from './social-histories.service';
import { CreateSocialHistoryDto } from './dto/create-social-history.dto';
import { UpdateSocialHistoryDto } from './dto/update-social-history.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('social-histories')
@Controller('social-histories')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SocialHistoriesController {
  constructor(
    private readonly socialHistoriesService: SocialHistoriesService,
  ) {}

  @Post()
  @Roles('Doctor', 'Nurse')
  @ApiOperation({ summary: 'Create social history' })
  @ApiResponse({ status: 201, description: 'Social history created' })
  create(@Body() createSocialHistoryDto: CreateSocialHistoryDto) {
    return this.socialHistoriesService.create(createSocialHistoryDto);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Nurse', 'Admin')
  @ApiOperation({ summary: 'Get social histories by visit ID' })
  @ApiResponse({ status: 200, description: 'List of social histories' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.socialHistoriesService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Doctor', 'Nurse')
  @ApiOperation({ summary: 'Update social history by ID' })
  @ApiResponse({ status: 200, description: 'Social history updated' })
  update(
    @Param('id') id: string,
    @Body() updateSocialHistoryDto: UpdateSocialHistoryDto,
  ) {
    return this.socialHistoriesService.update(id, updateSocialHistoryDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete social history by ID' })
  @ApiResponse({ status: 200, description: 'Social history deleted' })
  remove(@Param('id') id: string) {
    return this.socialHistoriesService.remove(id);
  }
}
