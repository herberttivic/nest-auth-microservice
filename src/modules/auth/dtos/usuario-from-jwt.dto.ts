export interface UsuarioFromJWTDto {
  sub: string;
  nome: string;
  email: string;
  cpf: string;
  iat: number;
  exp: number;
}
