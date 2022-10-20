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
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsNotEmpty()
  @IsLongitude()
  long: number;
}

export class CreateRiskLocationDTO {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Coords)
  coords: Coords;

  @IsNotEmpty()
  risk: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsMongoId()
  created_by: string;
}
