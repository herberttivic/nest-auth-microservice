/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsuarioEntity } from "src/modules/usuario/usuario.entity";
import { IUsuarioRepository } from "./usuario-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(UsuarioEntity)
    private typeOrmUsuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findByEmail(email: string) {
    const usuarioEncontrado = await this.typeOrmUsuarioRepository.findOne({
      where: {
        email,
      },
    });

    if (!usuarioEncontrado) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return usuarioEncontrado;
  }
  async findById(usuarioId: string) {
    const usuarioEncontrado = await this.typeOrmUsuarioRepository.findOne({
      where: {
        id: usuarioId,
      },
    });

    if (!usuarioEncontrado) {
      throw new NotFoundException("Usuário não encontrado");
    }
    return usuarioEncontrado;
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return await this.typeOrmUsuarioRepository.find();
  }
  async create(data: Omit<UsuarioEntity, "id">): Promise<UsuarioEntity> {
    const usuario = {
      ...data,
      senha: await bcrypt.hash(data.senha, 10),
    };
    return await this.typeOrmUsuarioRepository.save(usuario);
  }
  async update(
    id: string,
    data: Partial<UsuarioEntity>,
  ): Promise<UsuarioEntity> {
    const usuarioEncontrado = await this.typeOrmUsuarioRepository.findOne({
      where: {
        id,
      },
    });
    if (!usuarioEncontrado) {
      throw new NotFoundException("Usuário não encontrado");
    }

    await this.typeOrmUsuarioRepository.update({ id }, data);
    return Object.assign(usuarioEncontrado, data);
  }
  async delete(id: string): Promise<void> {
    const usuarioEncontrado = await this.typeOrmUsuarioRepository.findOne({
      where: {
        id,
      },
    });
    if (!usuarioEncontrado) {
      throw new NotFoundException("Usuário não encontrado");
    }
    await this.typeOrmUsuarioRepository.delete({ id });
  }
}
