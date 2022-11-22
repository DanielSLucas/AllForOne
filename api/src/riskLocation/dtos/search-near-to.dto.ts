import { ApiProperty } from '@nestjs/swagger';
import { IsLatLong, IsNotEmpty } from 'class-validator';

export class SearchNearToDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsLatLong()
  coords: string;

  @ApiProperty()
  @IsNotEmpty()
  radius: string;
}
