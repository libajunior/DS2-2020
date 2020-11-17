import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as zonas disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/zonas');
  }

  /**
   * Fornece a zona com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/zonas/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/zonas/${id}`);
  }

  /**
   * Exclui a zona com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/zonas/'+ id);
  }

  /**
   * Verifica se existe um ID na zona passada por parametro.
   * Se existir, significa que a zona deverá ser alterada,
   * caso contrário, significa que a zona será incluída
   * 
   * @param zona 
   */
  public salvar(zona: ZonaEntity) {
    if (zona.id) {
      return this.alterar(zona);
    } else {
      return this.adicionar(zona);
    }
  }

  /**
   * Adiciona uma nova zona 
   * 
   * @param zona 
   */
  private adicionar(zona: ZonaEntity) {
    return this.http.post(environment.urlSaaS +'/zonas', zona);
  }

  /**
   * Altera a zona passada por parâmetro
   * 
   * @param zona 
   */
  private alterar(zona: ZonaEntity) {
    return this.http.put(environment.urlSaaS +'/zonas/'+ zona.id, zona);
  }
}

export class ZonaEntity {
  id: number;
  nome: string;
  codigo: string;
}