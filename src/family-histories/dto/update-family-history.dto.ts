// src/family-histories/dto/update-family-history.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFamilyHistoryDto {
  @ApiProperty({ required: false })
  relationship?: string;

  @ApiProperty({ type: [String], required: false })
  conditions?: string[];
}
