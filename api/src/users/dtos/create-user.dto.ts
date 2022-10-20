import { IsBoolean, IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(RegexHelper.cellphone, {
    message: MessagesHelper.valid_cellphone,
  })
  cellphone: string;

  @IsNotEmpty()
  @IsBoolean()
  eula: boolean;
}
