import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthRequest } from "./dtos/auth.request.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() request: AuthRequest) {
    return await this.authService.login(request);
  }

  @Get("profile")
  getProfile(@Req() request: AuthRequest) {
    console.log(request.body);
    return request.user;
  }
}
