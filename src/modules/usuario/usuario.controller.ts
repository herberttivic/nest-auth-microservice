import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CreateUsuarioDto } from "./dtos/create-usuario-dto";
import { UpdateUsuarioDto } from "./dtos/update-usuario-dto";
@Controller("usuario")
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get("/:id")
  findOne(@Param("id") usuarioId: string) {
    return this.usuarioService.findById(usuarioId);
  }

  @Post()
  create(@Body() body: CreateUsuarioDto) {
    return this.usuarioService.create(body);
  }

  @Patch("/:id")
  update(@Param("id") usuarioId: string, @Body() body: UpdateUsuarioDto) {
    return this.usuarioService.update(usuarioId, body);
  }

  @Delete("/:id")
  delete(@Param("id") usuarioId: string) {
    return this.usuarioService.delete(usuarioId);
  }
}
