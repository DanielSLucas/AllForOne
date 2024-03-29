import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from '../../helpers/messages.helper';
import { RegexHelper } from '../../helpers/regex.helper';

export class UpdateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegexHelper.cellphone, {
    message: MessagesHelper.valid_cellphone,
  })
  cellphone: string;
}
