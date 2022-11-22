import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class Coords {
  @ApiProperty()
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsLongitude()
  long: number;
}

export class CreateRiskLocationDTO {
  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Coords)
  coords: Coords;

  @ApiProperty()
  @IsNotEmpty()
  risk: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  created_by: string;
}
