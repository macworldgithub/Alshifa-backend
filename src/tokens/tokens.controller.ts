// src/tokens/tokens.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('tokens')
@Controller('tokens')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  @Roles('Receptionist', 'Admin')
  @ApiOperation({ summary: 'Create token' })
  @ApiResponse({ status: 201, description: 'Token created' })
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }

  @Get('visit/:visitId')
  @Roles('Receptionist', 'Doctor', 'Admin')
  @ApiOperation({ summary: 'Get token by visit ID' })
  @ApiResponse({ status: 200, description: 'Token details' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.tokensService.findByVisit(visitId);
  }
}
