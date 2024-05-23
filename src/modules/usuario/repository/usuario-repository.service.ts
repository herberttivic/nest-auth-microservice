import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioEntity } from "src/modules/usuario/usuario.entity";

@Injectable()
export class UsuarioRepositoryService {
  private data: UsuarioEntity[] = [
    {
      id: 1,
      nome: "Herbert",
      cpf: "12312312321",
      email: "Herbert@tivic.com",
      senha: "123456",
    },
    {
      id: 2,
      nome: "Duarte",
      cpf: "12312312321",
      email: "Duarte@tivic.com",
      senha: "123456",
    },
    {
      id: 3,
      nome: "Santos",
      cpf: "12312312321",
      email: "Santos@tivic.com",
      senha: "123456",
    },
    {
      id: 4,
      nome: "Nascimento",
      cpf: "12312312321",
      email: "Nascimento@tivic.com",
      senha: "123456",
    },
  ];

  public async findByEmail(email: string) {
    const usuarioEncontrado = this.data.find(
      (usuario) => (usuario.email = email),
    );

    if (!usuarioEncontrado) {
      throw new NotFoundException("Usuário não encontrado!");
    }
    return usuarioEncontrado;
  }
}
