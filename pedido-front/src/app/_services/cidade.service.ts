import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/cidades');
  }

  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/cidades/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/cidades/${id}`);
  }

  public adicionar(cidade: CidadeEntity) {
    return this.http.post(environment.urlSaaS +'/cidades', cidade);
  }

  public alterar(cidade: CidadeEntity) {
    return this.http.put(environment.urlSaaS +'/cidades/'+ cidade.id, cidade);
  }

  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/cidades/'+ id);
  }
}

export class CidadeEntity {
  id: number;
  nome: string;
  uf: string;
}