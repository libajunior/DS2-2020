import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EleitorEntity } from './eleitor.entity';
import { CandidatoEntity } from './candidato.entity';

@Entity({name: 'votacao'})
export class VotacaoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'timestamp'})
    dthrvotacao: Date;

    @ManyToOne(type => EleitorEntity, {eager: true, nullable: false})
    eleitor: EleitorEntity;

    @ManyToOne(type => CandidatoEntity, {eager: true, nullable: false})
    candidato: CandidatoEntity;
}