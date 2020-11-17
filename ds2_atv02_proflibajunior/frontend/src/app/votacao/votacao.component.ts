import { EleitorService, EleitorEntity } from './../_services/eleitor.service';

import { CandidatoEntity } from './../_services/candidato.service';
import { MatTableDataSource } from '@angular/material/table';
import { Socket} from 'ngx-socket-io';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VotacaoService, VotacaoEntity } from '../_services/votacao.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { CandidatoService } from '../_services/candidato.service';

@Component({
  selector: 'app-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.scss']
})
export class VotacaoComponent implements OnInit {

  public displayedColumns: string[] = ['dthrvotacao', 'eleitor', 'candidato', 'options'];
  public votacoes: VotacaoEntity[] = [];
  public candidatos: CandidatoEntity[] = [];
  public eleitores: EleitorEntity[] = [];

  public dataSource = new MatTableDataSource<VotacaoEntity>();

  public errorMessage: string;
  public loading: boolean;

  public votacao: VotacaoEntity = new VotacaoEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: VotacaoService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private socketClient: Socket,
              private candidatoService: CandidatoService,
              private eleitorService: EleitorService) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega a lista de votacoes
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.votacoes = result as [];

      //Alimenta o datasource com os votacoes
      this.dataSource.data = this.votacoes;

      //Carrega os candidatos
      this.candidatoService.listarTodos().subscribe(result => {
        this.candidatos = result as [];
      });

      //Carrega os eleitores
      this.eleitorService.listarTodos().subscribe(result => {
        this.eleitores = result as [];
      });

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });

    //Listner do evento createVotacao
    this.socketClient.fromEvent('createVotacao').subscribe(result => {
      this.votacoes.push(result as VotacaoEntity)
      this.dataSource.data = this.votacoes;
    })

    //Listner do evento deleteVotacao
    this.socketClient.fromEvent('deleteVotacao').subscribe(result => {
      let votacao = result as VotacaoEntity;
      let index = this.votacoes.findIndex( item => item.id == votacao.id);

      this.votacoes.splice(index, 1);

      this.dataSource.data = this.votacoes;
    })

    //Listner do evento createVotacao
    this.socketClient.fromEvent('updateVotacao').subscribe(result => {
      let votacao = result as VotacaoEntity;
      let index = this.votacoes.findIndex( item => item.id == votacao.id);

      this.votacoes[index] = votacao;

      this.dataSource.data = this.votacoes;
    })
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.votacao).subscribe(result => {

      //Deu tudo certo, então avise o usuário...
      this.snackBar.open('Registro salvo com sucesso!', '', {
        duration: 3500
      });

    }, error => {
      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Não foi possível salvar o registro!', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, 
      //oculta a barra de progresso...
      this.loading = false;

      //... e fecha a sidenav com o formulário
      this.sidenav.close();
    })
  }

  /**
   * Chama a janela de confirmação de exclusão, se usuário confirmar
   * chama evento de exclusão da service.
   * 
   * @param votacao 
   */
  public excluir(votacao: VotacaoEntity): void {
    
    //Mostra a janela modal de confirmação
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: new ConfirmDialogOption('Excluir Registro', 'Deseja realmente exluir o registro?', 'warn')
    });

    //Depois de fechado (clicado em cancelar ou confirmar)...
    dialogRef.afterClosed().subscribe(result => {
      
      //Se confirmou, exclui o registro
      if (result) {
        this.service.excluir(votacao.id).subscribe(result => {
          
          //Deu certo, avisa o usuário...
          this.snackBar.open('Registro excluído com sucesso!', '', {
            duration: 3500
          });

        }, error => {
          
          //Se ocorreu algum erro neste processo, mostra mensagem para usuário
          this.showError('Não foi possível excluir o registro!', error);

        }).add(() => {
          
          //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
          this.loading = false;

        });
      }
    });
  }

  /**
   * Abre o formulário com um novo cliente para inclusão
   */
  public adicionar(): void {
    //Crio um novo objeto e abro o formulario
    this.openSidenav(new VotacaoEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param votacao
   */
  public editar(votacao: VotacaoEntity): void {
    //Como votacao é passado um objeto da tabela por referencia, 
    //se não for feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.assign({}, votacao));
  }

  /**
   * Função responsável por mostrar uma mensagem de erro padrão.
   * @param text
   * @param error 
   */
  private showError(text: string, error: any): void {
    //Mostra a snackbar com fundo customizado (vermelho)
    this.snackBar.open(text, '', {
      duration: 5000,
      panelClass: 'snakWarn'
    });

    //Adiciona a mensagem de erro no painel de erro
    this.errorMessage = (error.status == 0) ? 'Não foi possível conectar ao servidor' : error.message;
  }

  /**
   * Dá um open na sidnav exibindo o formulário com os dados 
   * da objeto passado por parâmetro.
   * 
   * @param votacao 
   */
  private openSidenav(votacao: VotacaoEntity): void {
    this.votacao = votacao;
    this.sidenav.open();
  }

  /**
   * Função responsável por carregar um item no select, comparando
   * os dois parametros se possuem ID's identicos. 
   * 
   * @param item1 
   * @param item2 
   */
  public compareOptions(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

}
