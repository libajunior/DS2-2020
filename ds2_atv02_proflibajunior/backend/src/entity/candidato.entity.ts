import { PartidoEntity } from './partido.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'candidato'})
export class CandidatoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 50})
    apelido: string;

    @Column({nullable: false, length: 5})
    numero: string;

    @ManyToOne(type => PartidoEntity, {eager: true, nullable: false})
    partido: PartidoEntity;
}