import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioRepository } from "./repository/usuario-typeorm-repository";
import { AuthRequest } from "../auth/dtos/auth.request.dto";
import { extractTokenFromHeader } from "src/utils/jwt/extract-token-from-header";
import { JwtService } from "@nestjs/jwt";
import { AuthPayloadDto } from "../auth/dtos/auth.payload.dto";
import { CreateUsuarioDto } from "./dtos/create-usuario-dto";
import { UpdateUsuarioDto } from "./dtos/update-usuario-dto";
import { QueryFailedError } from "typeorm";
import { UsuarioServiceException } from "./exceptions/create-usuario-exception";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsuarioService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<UsuarioEntity> {
    try {
      return await this.usuarioRepository.findByEmail(email);
    } catch (error: QueryFailedError | any) {
      this.exceptionHandler(error);
    }
  }

  async findById(email: string): Promise<UsuarioEntity> {
    try {
      return await this.usuarioRepository.findById(email);
    } catch (error: QueryFailedError | any) {
      this.exceptionHandler(error);
    }
  }

  async findAll(): Promise<UsuarioEntity[]> {
    try {
      return await this.usuarioRepository.findAll();
    } catch (error: QueryFailedError | any) {
      this.exceptionHandler(error);
    }
  }

  async create(data: CreateUsuarioDto): Promise<UsuarioEntity> {
    try {
      return await this.usuarioRepository.create(data);
    } catch (error: QueryFailedError | any) {
      console.log(error?.message);
      this.exceptionHandler(error);
    }
  }

  async update(id: string, data: UpdateUsuarioDto): Promise<UsuarioEntity> {
    try {
      return await this.usuarioRepository.update(id, data);
    } catch (error: QueryFailedError | any) {
      this.exceptionHandler(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      return await this.usuarioRepository.delete(id);
    } catch (error: QueryFailedError | any) {
      this.exceptionHandler(error);
    }
  }

  async profile(request: AuthRequest) {
    try {
      const token = extractTokenFromHeader(request);
      const payload = await this.getPayloadByToken(token);

      if (!payload) {
        throw new UnauthorizedException(
          "Não foi possível resgatar os dados de usuário a partir do código de acesso!",
        );
      }

      const usuario = this.validateByEmailPassword(
        payload.email,
        payload.senha,
      );
      if (!usuario) {
        throw new UnauthorizedException("Dados de login inválidos!");
      }
      return usuario;
    } catch (error) {
      return this.exceptionHandler(error);
    }
  }

  async getPayloadByToken(token: string): Promise<AuthPayloadDto | null> {
    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET_KEY,
      })) as AuthPayloadDto;
      return payload;
    } catch (error: QueryFailedError | any) {
      return null;
    }
  }

  async validateByEmailPassword(
    email: string,
    senha: string,
  ): Promise<Omit<UsuarioEntity, "senha">> {
    const usuario = await this.usuarioRepository.findByEmail(email);

    const isValidPassword = await bcrypt.compare(senha, usuario.senha);
    if (!usuario || !isValidPassword) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: senhaOmitida, ...dados } = usuario;

    return dados;
  }

  exceptionHandler(error: QueryFailedError | any, msg?: string) {
    if (error instanceof QueryFailedError) {
      if (msg) throw new UsuarioServiceException(error, msg);
      throw new UsuarioServiceException(error);
    } else if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException(
        "Houve um erro inesperado! " + error.message,
      );
    }
  }
}
