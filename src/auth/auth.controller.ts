// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

class LoginDto {
  identifier: string;
  password: string;
}

// src/auth/dto/login-response.dto.ts (or inside auth.controller.ts)
class UserResponseDto {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  mobileNumber?: string;
  assignedDepartment?: string;
  status: string;
  department?: string;
  specialization?: string;
  email?: string;
  availabilityTimings?: string;
  assignedRoom?: string;
  maxDailyPatients?: number;
  assignedCounter?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class LoginResponseDto {
  access_token: string;
  user: UserResponseDto;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
