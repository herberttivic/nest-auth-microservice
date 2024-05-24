import { UsuarioModule } from "./modules/usuario/usuario.module";
import { AuthModule } from "./modules/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    UsuarioModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 15432,
      username: "postgres",
      password: "postgres",
      database: "auth_test_db",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
