import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as partidos disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/partidos');
  }

  /**
   * Fornece a partido com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/partidos/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/partidos/${id}`);
  }

  /**
   * Exclui a partido com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/partidos/'+ id);
  }

  /**
   * Verifica se existe um ID na partido passada por parametro.
   * Se existir, significa que a partido deverá ser alterada,
   * caso contrário, significa que a partido será incluída
   * 
   * @param partido 
   */
  public salvar(partido: PartidoEntity) {
    if (partido.id) {
      return this.alterar(partido);
    } else {
      return this.adicionar(partido);
    }
  }

  /**
   * Adiciona uma nova partido 
   * 
   * @param partido 
   */
  private adicionar(partido: PartidoEntity) {
    return this.http.post(environment.urlSaaS +'/partidos', partido);
  }

  /**
   * Altera a partido passada por parâmetro
   * 
   * @param partido 
   */
  private alterar(partido: PartidoEntity) {
    return this.http.put(environment.urlSaaS +'/partidos/'+ partido.id, partido);
  }
}

export class PartidoEntity {
  id: number;
  nome: string;
  legenda: string;
}