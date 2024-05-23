import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsuarioService } from "../usuario/usuario.service";
import { JwtService } from "@nestjs/jwt";
import { AuthPayloadDto } from "./dtos/auth.payload.dto";
import { UsuarioEntity } from "../usuario/usuario.entity";

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    if (username == "" || password == "") {
      throw new NotFoundException("Insira o email e a senha!");
    }

    const usuario = await this.validateByEmailPassword(username, password);
    const payload = this.createPayload(usuario);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async isValidPayload(payload: AuthPayloadDto) {
    return await this.validateByEmailPassword(payload.email, payload.senha);
  }

  private createPayload(usuario: UsuarioEntity): AuthPayloadDto {
    const rawPayload = {
      sub: usuario.id,
      ...usuario,
    };
    delete rawPayload.id;

    return { ...rawPayload };
  }

  private async validateByEmailPassword(
    email: string,
    password: string,
  ): Promise<UsuarioEntity> {
    const usuario = await this.usuarioService.findByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException("Usuário não encontrado!");
    }
    if (usuario.senha !== password) {
      throw new UnauthorizedException("Senha incorreta.");
    }

    return usuario;
  }
}
