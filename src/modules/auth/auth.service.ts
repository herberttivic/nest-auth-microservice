import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioService } from "../usuario/usuario.service";
import { JwtService } from "@nestjs/jwt";
import { AuthPayloadDto } from "./dtos/auth.payload.dto";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { AuthLoginDto } from "./dtos/auth.login.dto";
// import { AuthRequest } from "./dtos/auth.request.dto";

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

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

  async validateByEmailPassword(
    email: string,
    senha: string,
  ): Promise<UsuarioEntity> {
    const usuario = await this.usuarioService.findByEmail(email);

    // IMPLEMENTAR LÓGICA DE ENCRIPTOGRAFIA
    if (!usuario || usuario.senha !== senha) {
      return null;
    }

    return usuario;
  }
}
