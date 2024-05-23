import { UsuarioRepositoryService } from "src/modules/usuario/repositories/usuario-repository/usuario-repository.service";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepositoryService],
  exports: [UsuarioRepositoryService, UsuarioService],
})
export class UsuarioModule {}
