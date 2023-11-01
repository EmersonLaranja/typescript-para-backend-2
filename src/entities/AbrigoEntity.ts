import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import EnderecoEntity from "./Endereco";
import PetEntity from "./PetEntity";

@Entity()
export default class AbrigoEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  celular: string;
  @Column()
  senha: string;
  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: EnderecoEntity;

  @OneToMany(() => PetEntity, (pet) => pet.abrigo)
  pets!: PetEntity[];

  constructor(nome: string, celular: string, email: string, senha: string) {
    this.nome = nome;
    this.celular = celular;
    this.email = email;
    this.senha = senha;
  }
}
