import { ZonaEntity } from './zona.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'secao'})
export class SecaoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 4})
    codigo: string;

    @ManyToOne(type => ZonaEntity, {eager: true, nullable: false})
    zona: ZonaEntity;
}