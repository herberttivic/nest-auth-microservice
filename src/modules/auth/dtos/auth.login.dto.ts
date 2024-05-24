import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: "A senha precisa ter no mínimo 6",
  })
  password: string;
}
