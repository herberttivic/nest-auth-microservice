import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsuarioModule } from "../usuario/usuario.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import * as dotenv from "dotenv";
import { LocalStrategy } from "./strategies/local.stragegy";
import { PassportModule } from "@nestjs/passport";

dotenv.config();

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UsuarioModule),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
