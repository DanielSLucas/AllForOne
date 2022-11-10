import { IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from '../../helpers/messages.helper';
import { RegexHelper } from '../../helpers/regex.helper';

export class UpdateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(RegexHelper.cellphone, {
    message: MessagesHelper.valid_cellphone,
  })
  cellphone: string;
}
