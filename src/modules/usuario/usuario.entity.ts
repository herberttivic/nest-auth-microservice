import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UsuarioEntity {
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString({
    message: "O nome precisa ser uma string!",
  })
  nome: string;

  @IsNotEmpty()
  @IsString({
    message: "Email inválido!",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: "A senha deve conter pelo menos 6 dígitos",
  })
  @IsString({
    message: "A senha precisa ser uma string!",
  })
  senha: string;
}
