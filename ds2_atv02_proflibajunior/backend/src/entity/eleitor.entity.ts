import { SecaoEntity } from './secao.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'eleitor'})
export class EleitorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 12})
    titulo: string;

    @ManyToOne(type => SecaoEntity, {eager: true, nullable: false})
    secao: SecaoEntity;
}