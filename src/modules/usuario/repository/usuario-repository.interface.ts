import { UsuarioEntity } from "../usuario.entity";

export interface IUsuarioRepository {
  findAll(): Promise<UsuarioEntity[]>;
  findByEmail(email: string): Promise<UsuarioEntity>;
  create(data: Omit<UsuarioEntity, "id">): Promise<UsuarioEntity>;
  update(id: string, data: Partial<UsuarioEntity>): Promise<UsuarioEntity>;
  delete(id: string): Promise<void>;
}
