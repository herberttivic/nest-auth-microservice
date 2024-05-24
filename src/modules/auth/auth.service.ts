import { Injectable } from "@nestjs/common";
import { UsuarioService } from "../usuario/usuario.service";
import { AuthPayloadDto } from "./dtos/auth.payload.dto";
import { UsuarioEntity } from "../usuario/usuario.entity";

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async login(request): Promise<any> {
    // const payload = this.createPayload(usuario);
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }

  private createPayload(usuario: UsuarioEntity): AuthPayloadDto {
    const rawPayload = {
      sub: usuario.id,
      ...usuario,
    };
    delete rawPayload.id;

    return { ...rawPayload };
  }

  async validateLogin(
    email: string,
    senha: string,
  ): Promise<Omit<UsuarioEntity, "senha">> {
    return this.usuarioService.validateByEmailPassword(email, senha);
  }
}
