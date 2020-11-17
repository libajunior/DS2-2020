import { ZonaComponent } from './zona/zona.component';
import { SecaoComponent } from './secao/secao.component';
import { PartidoComponent } from './partido/partido.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatoComponent } from './candidato/candidato.component';
import { EleitorComponent } from './eleitor/eleitor.component';
import { VotacaoComponent } from './votacao/votacao.component';

const routes: Routes = [
  {path: 'candidatos', component: CandidatoComponent},
  {path: 'eleitores', component: EleitorComponent},
  {path: 'partidos', component: PartidoComponent},
  {path: 'secoes', component: SecaoComponent},
  {path: 'votacoes', component: VotacaoComponent},
  {path: 'zonas', component: ZonaComponent},
  {path: '**', redirectTo: 'candidatos'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
