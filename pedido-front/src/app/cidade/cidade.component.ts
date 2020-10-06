import { CidadeService } from './../_services/cidade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.scss']
})
export class CidadeComponent implements OnInit {

  public cidades: [];

  constructor(private service: CidadeService) { }

  ngOnInit(): void {
    this.service.listarTodos().subscribe(result => {
      this.cidades = result as [];
    }, error => {
      console.log
    })

  }

}
