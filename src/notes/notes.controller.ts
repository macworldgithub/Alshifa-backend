// src/notes/notes.controller.ts
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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @Roles('Doctor','Admin')
  @ApiOperation({ summary: 'Create note' })
  @ApiResponse({ status: 201, description: 'Note created' })
  create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    return this.notesService.create(createNoteDto, req.user.userId);
  }

  @Get('visit/:visitId')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Get notes by visit ID' })
  @ApiResponse({ status: 200, description: 'List of notes' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.notesService.findByVisit(visitId);
  }

  @Get(':id')
  @Roles('Doctor', 'Admin')
  @ApiOperation({ summary: 'Get note by ID' })
  @ApiResponse({ status: 200, description: 'Note details' })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  @Roles('Doctor')
  @ApiOperation({ summary: 'Update note by ID' })
  @ApiResponse({ status: 200, description: 'Note updated' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete note by ID' })
  @ApiResponse({ status: 200, description: 'Note deleted' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
