import { UsuarioRepositoryModule } from "./modules/usuario/repository/usuario-repository.module";
import { UsuarioModule } from "./modules/usuario/usuario.module";
import { AuthModule } from "./modules/auth/auth.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [UsuarioRepositoryModule, UsuarioModule, AuthModule],
})
export class AppModule {}
