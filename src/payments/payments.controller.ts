// src/payments/payments.controller.ts
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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles('Receptionist', 'Admin')
  @ApiOperation({ summary: 'Record payment' })
  @ApiResponse({ status: 201, description: 'Payment recorded' })
  create(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
    return this.paymentsService.create(createPaymentDto, req.user.userId);
  }

  @Get('visit/:visitId')
  @Roles('Receptionist', 'Admin')
  @ApiOperation({ summary: 'Get payment by visit ID' })
  @ApiResponse({ status: 200, description: 'Payment details' })
  findByVisit(@Param('visitId') visitId: string) {
    return this.paymentsService.findByVisit(visitId);
  }

  @Put(':id')
  @Roles('Receptionist', 'Admin')
  @ApiOperation({ summary: 'Update payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment updated' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment deleted' })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
