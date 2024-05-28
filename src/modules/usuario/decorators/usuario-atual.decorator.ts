import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthRequest } from "src/modules/auth/dtos/auth.request.dto";
import { UsuarioFromJWTDto } from "src/modules/auth/dtos/usuario-from-jwt.dto";

export const UsuarioAtual = createParamDecorator(
  (data: unknown, context: ExecutionContext): UsuarioFromJWTDto => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
