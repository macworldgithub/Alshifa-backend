// src/family-histories/dto/create-family-history.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateFamilyHistoryDto {
  @ApiProperty()
  visit: string;

  @ApiProperty()
  relationship: string;

  @ApiProperty({ type: [String] })
  conditions: string[];
}
