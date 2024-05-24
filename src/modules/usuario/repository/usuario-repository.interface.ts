import { CreateUsuarioDto } from "../dtos/create-usuario-dto";
import { UpdateUsuarioDto } from "../dtos/update-usuario-dto";
import { UsuarioEntity } from "../usuario.entity";

export interface IUsuarioRepository {
  findAll(): Promise<UsuarioEntity[]>;
  findByEmail(email: string): Promise<UsuarioEntity>;
  create(data: CreateUsuarioDto): Promise<UsuarioEntity>;
  update(id: string, data: UpdateUsuarioDto): Promise<UsuarioEntity>;
  delete(id: string): Promise<void>;
}
