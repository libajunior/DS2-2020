import { PartidoEntity } from './partido.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as candidatos disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/candidatos');
  }

  /**
   * Fornece a candidato com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/candidatos/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/candidatos/${id}`);
  }

  /**
   * Exclui a candidato com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/candidatos/'+ id);
  }

  /**
   * Verifica se existe um ID na candidato passada por parametro.
   * Se existir, significa que a candidato deverá ser alterada,
   * caso contrário, significa que a candidato será incluída
   * 
   * @param candidato 
   */
  public salvar(candidato: CandidatoEntity) {
    if (candidato.id) {
      return this.alterar(candidato);
    } else {
      return this.adicionar(candidato);
    }
  }

  /**
   * Adiciona uma nova candidato 
   * 
   * @param candidato 
   */
  private adicionar(candidato: CandidatoEntity) {
    return this.http.post(environment.urlSaaS +'/candidatos', candidato);
  }

  /**
   * Altera a candidato passada por parâmetro
   * 
   * @param candidato 
   */
  private alterar(candidato: CandidatoEntity) {
    return this.http.put(environment.urlSaaS +'/candidatos/'+ candidato.id, candidato);
  }
}

export class CandidatoEntity {
  id: number;
  nome: string;
  apelido: string;
  numero: string;
  partido: PartidoEntity
}