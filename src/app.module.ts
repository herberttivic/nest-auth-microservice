import { UsuarioModule } from "./modules/usuario/usuario.module";
import { AuthModule } from "./modules/auth/auth.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
