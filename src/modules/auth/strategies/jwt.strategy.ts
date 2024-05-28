import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthPayloadDto } from "../dtos/auth.payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET_KEY,
    });
  }

  async validate(payload: AuthPayloadDto): Promise<AuthPayloadDto> {
    return payload;
  }
}
