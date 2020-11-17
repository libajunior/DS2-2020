import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'zona'})
export class ZonaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 3})
    codigo: string;
}