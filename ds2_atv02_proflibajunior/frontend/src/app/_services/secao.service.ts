import { ZonaEntity } from './zona.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecaoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as secoes disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/secoes');
  }

  /**
   * Fornece a secao com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/secoes/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/secoes/${id}`);
  }

  /**
   * Exclui a secao com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/secoes/'+ id);
  }

  /**
   * Verifica se existe um ID na secao passada por parametro.
   * Se existir, significa que a secao deverá ser alterada,
   * caso contrário, significa que a secao será incluída
   * 
   * @param secao 
   */
  public salvar(secao: SecaoEntity) {
    if (secao.id) {
      return this.alterar(secao);
    } else {
      return this.adicionar(secao);
    }
  }

  /**
   * Adiciona uma nova secao 
   * 
   * @param secao 
   */
  private adicionar(secao: SecaoEntity) {
    return this.http.post(environment.urlSaaS +'/secoes', secao);
  }

  /**
   * Altera a secao passada por parâmetro
   * 
   * @param secao 
   */
  private alterar(secao: SecaoEntity) {
    return this.http.put(environment.urlSaaS +'/secoes/'+ secao.id, secao);
  }
}

export class SecaoEntity {
  id: number;
  codigo: string;
  zona: ZonaEntity;
}