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

  constructor(private service: CidadeService) { }

  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega a lista de cidades
    this.service.listarTodos().subscribe(result => {
      this.cidades = result as [];
      this.loading = false;
    }, error => {
      this.errorMessage = (error.status == 0) ? 'Não foi possível conectar ao servidor' : error.message;
      this.loading = false;
    })

  }

}
