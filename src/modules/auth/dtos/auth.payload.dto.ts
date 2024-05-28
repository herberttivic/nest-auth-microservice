import { UsuarioEntity } from "src/modules/usuario/usuario.entity";

export interface AuthPayloadDto
  extends Omit<Omit<UsuarioEntity, "id">, "senha"> {
  sub: string;
}
