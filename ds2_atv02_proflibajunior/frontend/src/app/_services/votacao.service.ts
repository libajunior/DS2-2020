import { CandidatoEntity } from './candidato.service';
import { EleitorEntity } from './eleitor.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VotacaoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as votacoes disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/votacoes');
  }

  /**
   * Fornece a votacao com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/votacoes/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/votacoes/${id}`);
  }

  /**
   * Exclui a votacao com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/votacoes/'+ id);
  }

  /**
   * Verifica se existe um ID na votacao passada por parametro.
   * Se existir, significa que a votacao deverá ser alterada,
   * caso contrário, significa que a votacao será incluída
   * 
   * @param votacao 
   */
  public salvar(votacao: VotacaoEntity) {
    if (votacao.id) {
      return this.alterar(votacao);
    } else {
      return this.adicionar(votacao);
    }
  }

  /**
   * Adiciona uma nova votacao 
   * 
   * @param votacao 
   */
  private adicionar(votacao: VotacaoEntity) {
    return this.http.post(environment.urlSaaS +'/votacoes', votacao);
  }

  /**
   * Altera a votacao passada por parâmetro
   * 
   * @param votacao 
   */
  private alterar(votacao: VotacaoEntity) {
    return this.http.put(environment.urlSaaS +'/votacoes/'+ votacao.id, votacao);
  }
}

export class VotacaoEntity {
  id: number;
  dthrvotacao: Date;
  eleitor: EleitorEntity;
  candidato: CandidatoEntity;

  constructor() {
    this.dthrvotacao = new Date();
  }
}