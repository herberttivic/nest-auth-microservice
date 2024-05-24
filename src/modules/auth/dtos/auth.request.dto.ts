import { Request } from "express";
import { AuthPayloadDto } from "./auth.payload.dto";

export interface AuthRequest extends Request {
  user: AuthPayloadDto;
}
