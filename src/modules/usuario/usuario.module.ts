import { AuthModule } from "../auth/auth.module";
import { UsuarioRepositoryService } from "./repository/usuario-repository.service";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { Module, forwardRef } from "@nestjs/common";

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepositoryService],
  exports: [UsuarioRepositoryService, UsuarioService],
})
export class UsuarioModule {}
