import { CidadeComponent } from './cidade/cidade.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaprecoComponent } from './tabelapreco/tabelapreco.component';
import { ProdutoComponent } from './produto/produto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  {path: 'cidades', component: CidadeComponent},
  {path: 'tabelasprecos', component: TabelaprecoComponent},
  {path: 'produtos', component: ProdutoComponent},
  {path: 'clientes', component: ClienteComponent},
  {path: 'pedidos', component: PedidoComponent},
  {path: '**', redirectTo: 'pedidos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
