import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true }) // Validate that each element is a number
  sectorIds: number[]; // Array of sector IDs

  @IsNotEmpty()
  @IsBoolean()
  terms: boolean;
}
