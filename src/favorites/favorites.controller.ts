// src/favorites/favorites.controller.ts
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
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Create favorite' })
  @ApiResponse({ status: 201, description: 'Favorite created' })
  create(@Body() createFavoriteDto: CreateFavoriteDto, @Request() req) {
    createFavoriteDto.doctor = req.user.userId;
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Get favorites by doctor' })
  @ApiResponse({ status: 200, description: 'List of favorites' })
  findByDoctor(@Request() req) {
    return this.favoritesService.findByDoctor(req.user.userId);
  }

  @Get(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Get favorite by ID' })
  @ApiResponse({ status: 200, description: 'Favorite details' })
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  @Put(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Update favorite by ID' })
  @ApiResponse({ status: 200, description: 'Favorite updated' })
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoritesService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Delete favorite by ID' })
  @ApiResponse({ status: 200, description: 'Favorite deleted' })
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}
