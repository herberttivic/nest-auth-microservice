import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthRequest } from "./dtos/auth.request.dto";
import { IsPublic } from "./decorators/is-public.decorator";
import { UsuarioAtual } from "../usuario/decorators/usuario-atual.decorator";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { UsuarioFromJWTDto } from "./dtos/usuario-from-jwt.dto";
import { AuthPayloadDto } from "./dtos/auth.payload.dto";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() request: AuthRequest) {
    return await this.authService.login(request);
  }

  @Get("me")
  getProfile(@UsuarioAtual() usuario: UsuarioFromJWTDto): UsuarioFromJWTDto {
    return usuario;
  }
}
