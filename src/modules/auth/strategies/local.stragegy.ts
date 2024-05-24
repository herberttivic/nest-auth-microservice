import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UsuarioEntity } from "src/modules/usuario/usuario.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(
    email: string,
    senha: string,
  ): Promise<Omit<UsuarioEntity, "senha">> {
    const usuario = await this.authService.validateLogin(email, senha);

    if (!usuario) {
      throw new UnauthorizedException("Email e/ou senha inválidos!");
    }

    return usuario;
  }
}
