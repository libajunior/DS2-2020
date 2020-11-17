import { SecaoEntity } from './secao.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EleitorService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as eleitores disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/eleitores');
  }

  /**
   * Fornece a eleitor com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/eleitores/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/eleitores/${id}`);
  }

  /**
   * Exclui a eleitor com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/eleitores/'+ id);
  }

  /**
   * Verifica se existe um ID na eleitor passada por parametro.
   * Se existir, significa que a eleitor deverá ser alterada,
   * caso contrário, significa que a eleitor será incluída
   * 
   * @param eleitor 
   */
  public salvar(eleitor: EleitorEntity) {
    if (eleitor.id) {
      return this.alterar(eleitor);
    } else {
      return this.adicionar(eleitor);
    }
  }

  /**
   * Adiciona uma nova eleitor 
   * 
   * @param eleitor 
   */
  private adicionar(eleitor: EleitorEntity) {
    return this.http.post(environment.urlSaaS +'/eleitores', eleitor);
  }

  /**
   * Altera a eleitor passada por parâmetro
   * 
   * @param eleitor 
   */
  private alterar(eleitor: EleitorEntity) {
    return this.http.put(environment.urlSaaS +'/eleitores/'+ eleitor.id, eleitor);
  }
}

export class EleitorEntity {
  id: number;
  nome: string;
  titulo: string;
  secao: SecaoEntity;
}