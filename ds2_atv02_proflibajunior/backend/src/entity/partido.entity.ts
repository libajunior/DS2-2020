import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'partido'})
export class PartidoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 15})
    legenda: string;
}