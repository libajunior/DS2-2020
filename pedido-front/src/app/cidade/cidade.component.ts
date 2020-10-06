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

  constructor(private service: CidadeService) { }

  ngOnInit(): void {
    this.service.listarTodos().subscribe(result => {
      console.log(result)
    
      this.cidades = result as [];
    }, error => {
      console.log('PAU!',error)
    })

  }

}
