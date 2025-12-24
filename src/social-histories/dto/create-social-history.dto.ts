// src/social-histories/dto/create-social-history.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateSocialHistoryDto {
  @ApiProperty()
  visit: string;

  @ApiProperty()
  socialType: string;

  @ApiProperty()
  socialDescription: string;

  @ApiProperty()
  quantity: string;
}
