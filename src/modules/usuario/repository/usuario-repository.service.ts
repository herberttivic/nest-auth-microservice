import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioEntity } from "src/modules/usuario/usuario.entity";
import { IUsuarioRepository } from "./usuario-repository.interface";
import { data } from "./fake-db";

@Injectable()
export class UsuarioRepositoryService implements IUsuarioRepository {
  public async findByEmail(email: string) {
    const usuarioEncontrado = data.find((usuario) => (usuario.email = email));

    if (!usuarioEncontrado) {
      throw new NotFoundException("Usuário não encontrado!");
    }
    return usuarioEncontrado;
  }

  findAll(): Promise<UsuarioEntity[]> {
    throw new Error("Method not implemented.");
  }
  create(data: Omit<UsuarioEntity, "id">): Promise<UsuarioEntity> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
