// src/social-histories/dto/update-social-history.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSocialHistoryDto {
  @ApiProperty({ required: false })
  socialType?: string;

  @ApiProperty({ required: false })
  socialDescription?: string;

  @ApiProperty({ required: false })
  quantity?: string;
}
