import { UsuarioEntity } from "src/modules/usuario/usuario.entity";

export interface AuthPayloadDto extends Omit<UsuarioEntity, "id"> {
  sub: number;
}
