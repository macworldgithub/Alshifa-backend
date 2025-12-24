// src/allergies/dto/update-allergy.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAllergyDto {
  @ApiProperty({ required: false })
  allergyType?: string;

  @ApiProperty({ required: false })
  allergySeverity?: string;

  @ApiProperty({ required: false })
  allergenCode?: string;

  @ApiProperty({ required: false })
  allergenReaction?: string;

  @ApiProperty({ required: false })
  onsetDate?: string;
}
