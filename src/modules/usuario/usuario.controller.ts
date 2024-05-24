import { Controller, Get } from "@nestjs/common";

@Controller("usuario")
export class UsuarioController {
  @Get("/hello")
  sayHello() {
    return {
      message: "Hello authenticated!",
    };
  }
}
