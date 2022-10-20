import { IsLatLong, IsNotEmpty } from 'class-validator';

export class SearchNearToDTO {
  @IsNotEmpty()
  @IsLatLong()
  coords: string;

  @IsNotEmpty()
  radius: string;
}
