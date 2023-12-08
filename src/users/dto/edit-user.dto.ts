import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true }) // Validate that each element is a number
  sectorIds?: number[]; // Array of sector IDs

  @IsOptional()
  @IsBoolean()
  terms?: boolean;
}
