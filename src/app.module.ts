import { UsuarioRepositoryModule } from "./modules/usuario/repository/usuario-repository.module";
import { UsuarioModule } from "./modules/usuario/usuario.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthService } from "./modules/auth/auth.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [UsuarioRepositoryModule, UsuarioModule, AuthModule],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
