import { Request } from "express";
import { UsuarioEntity } from "src/modules/usuario/usuario.entity";
import { AuthPayloadDto } from "./auth.payload.dto";

export interface AuthRequest extends Request {
  user: UsuarioEntity;
}
export interface AuthenticatedRequest extends Request {
  user: AuthPayloadDto;
}
