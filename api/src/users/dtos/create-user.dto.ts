import { IsBoolean, IsNotEmpty, Matches } from 'class-validator';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(RegexHelper.cellphone, {
    message: "Deve ser um celular válido: DDD + '9' + celular",
  })
  cellphone: string;

  @IsNotEmpty()
  @IsBoolean()
  eula: boolean;
}
