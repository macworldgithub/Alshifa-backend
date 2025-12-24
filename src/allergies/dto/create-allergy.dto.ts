// src/allergies/dto/create-allergy.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateAllergyDto {
  @ApiProperty()
  visit: string;

  @ApiProperty()
  allergyType: string;

  @ApiProperty()
  allergySeverity: string;

  @ApiProperty()
  allergenCode: string;

  @ApiProperty()
  allergenReaction: string;

  @ApiProperty()
  onsetDate: string;
}
