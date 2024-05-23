import { Module } from "@nestjs/common";
import { UsuarioRepositoryService } from "./usuario-repository.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UsuarioRepositoryService],
})
export class UsuarioRepositoryModule {}
