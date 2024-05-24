import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioRepository } from "./repository/usuario-typeorm-repository";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { Module } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository, JwtService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
