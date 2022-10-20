import { IsNotEmpty, Matches } from 'class-validator';

import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateOtpDTO {
  @IsNotEmpty()
  @Matches(RegexHelper.cellphone, {
    message: MessagesHelper.valid_cellphone,
  })
  cellphone: string;
}
