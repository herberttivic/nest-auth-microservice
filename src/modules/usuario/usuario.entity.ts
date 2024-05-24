import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  senha: string;
}
