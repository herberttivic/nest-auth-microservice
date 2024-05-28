import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthenticatedRequest } from "src/modules/auth/dtos/auth.request.dto";
import { UsuarioFromJWTDto } from "src/modules/auth/dtos/usuario-from-jwt.dto";

export const UsuarioAtual = createParamDecorator(
  (data: unknown, context: ExecutionContext): UsuarioFromJWTDto => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...dados } = request.user;

    return { ...dados } as UsuarioFromJWTDto;
  },
);
