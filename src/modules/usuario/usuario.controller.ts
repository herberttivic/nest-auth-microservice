import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";

@Controller("usuario")
export class UsuarioController {
  @Get("/hello")
  @UseGuards(AuthGuard)
  sayHello() {
    return {
      message: "Hello authenticated!",
    };
  }
}
