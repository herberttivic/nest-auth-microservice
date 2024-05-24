import { HttpException, HttpStatus } from "@nestjs/common";
import { QueryFailedError } from "typeorm";

export class UsuarioServiceException extends HttpException {
  constructor(erro: QueryFailedError, msg?: string) {
    const status = HttpStatus.BAD_REQUEST;
    const message = msg || handleErrorMessage(erro);
    super(message, status);

    function handleErrorMessage(error: QueryFailedError): string {
      if (
        error?.message.includes(
          "duplicate key value violates unique constraint",
        )
      ) {
        return "O email e/ou o CPF inserido já foi cadastrado!";
      } else if (error instanceof HttpException) {
        return error?.message;
      }
      return error?.message;
    }
  }
}
