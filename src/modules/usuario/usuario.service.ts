import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioRepositoryService } from "./repository/usuario-repository.service";

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepositoryService) {}

  async findByEmail(email: string): Promise<UsuarioEntity> {
    return await this.usuarioRepository.findByEmail(email);
  }
}
