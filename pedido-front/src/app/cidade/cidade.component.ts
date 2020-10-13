import { CidadeEntity, CidadeService } from './../_services/cidade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.scss']
})
export class CidadeComponent implements OnInit {

  public displayedColumns: string[] = ['nome', 'uf', 'options'];
  public cidades: CidadeEntity[] = [];

  public errorMessage: string;
  public loading: boolean;

  public cidade: CidadeEntity = new CidadeEntity();

  constructor(private service: CidadeService) { }

  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    this.cidade.nome = 'Itú';
    this.cidade.uf = 'SP';

    //Carrega a lista de cidades
    this.service.listarTodos().subscribe(result => {
      this.cidades = result as [];
      this.loading = false;
    }, error => {
      this.errorMessage = (error.status == 0) ? 'Não foi possível conectar ao servidor' : error.message;
      this.loading = false;
    })

  }

  public confirmar(): void {
    this.loading = true;

    this.service.adicionar(this.cidade).subscribe(result => {
      console.log('result', result);
    }, error => {
      console.log('pau', error);
      this.errorMessage = error.message;
    })
  }

}
