import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
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

export class UpdateRiskLocationDTO {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Coords)
  coords: Coords;

  @IsNotEmpty()
  risk: string;

  @IsNotEmpty()
  description: string;
}
