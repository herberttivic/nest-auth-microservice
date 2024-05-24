import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString({ message: "NOME precisa ser uma string." })
  nome: string;

  @IsNotEmpty()
  @IsString({ message: "EMAIL inválido." })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString({ message: "CPF precisa ser uma string." })
  cpf: string;

  @IsNotEmpty()
  @IsString({ message: "SENHA precisa ser uma string." })
  senha: string;
}
