import { Injectable } from "@nestjs/common";
import { UsuarioService } from "../usuario/usuario.service";
import { AuthPayloadDto } from "./dtos/auth.payload.dto";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { AuthRequest } from "./dtos/auth.request.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(request: AuthRequest): Promise<any> {
    const payload = this.createPayload(request.user);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private createPayload(usuario: Omit<UsuarioEntity, "senha">): AuthPayloadDto {
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
