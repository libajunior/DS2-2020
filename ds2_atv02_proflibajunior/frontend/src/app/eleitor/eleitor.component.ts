import { SecaoEntity } from './../_services/secao.service';
import { MatTableDataSource } from '@angular/material/table';
import { Socket} from 'ngx-socket-io';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EleitorService, EleitorEntity } from '../_services/eleitor.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { SecaoService } from '../_services/secao.service';

@Component({
  selector: 'app-eleitor',
  templateUrl: './eleitor.component.html',
  styleUrls: ['./eleitor.component.scss']
})
export class EleitorComponent implements OnInit {

  public displayedColumns: string[] = ['titulo', 'nome', 'zona', 'secao', 'options'];
  public eleitores: EleitorEntity[] = [];
  public secoes: SecaoEntity[] = [];

  public dataSource = new MatTableDataSource<EleitorEntity>();

  public errorMessage: string;
  public loading: boolean;

  public eleitor: EleitorEntity = new EleitorEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: EleitorService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private socketClient: Socket,
              private secaoService: SecaoService) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega a lista de eleitores
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.eleitores = result as [];

      //Alimenta o datasource com os eleitores
      this.dataSource.data = this.eleitores;

      //Carrega as secoes
      this.secaoService.listarTodos().subscribe(result => {
        this.secoes = result as [];
      });

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });

    //Listner do evento createEleitor
    this.socketClient.fromEvent('createEleitor').subscribe(result => {
      this.eleitores.push(result as EleitorEntity)
      this.dataSource.data = this.eleitores;
    })

    //Listner do evento deleteEleitor
    this.socketClient.fromEvent('deleteEleitor').subscribe(result => {
      let eleitor = result as EleitorEntity;
      let index = this.eleitores.findIndex( item => item.id == eleitor.id);

      this.eleitores.splice(index, 1);

      this.dataSource.data = this.eleitores;
    })

    //Listner do evento createEleitor
    this.socketClient.fromEvent('updateEleitor').subscribe(result => {
      let eleitor = result as EleitorEntity;
      let index = this.eleitores.findIndex( item => item.id == eleitor.id);

      this.eleitores[index] = eleitor;

      this.dataSource.data = this.eleitores;
    })
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.eleitor).subscribe(result => {

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
   * @param eleitor 
   */
  public excluir(eleitor: EleitorEntity): void {
    
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
        this.service.excluir(eleitor.id).subscribe(result => {
          
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
    this.openSidenav(new EleitorEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param eleitor
   */
  public editar(eleitor: EleitorEntity): void {
    //Como eleitor é passado um objeto da tabela por referencia, 
    //se não for feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.assign({}, eleitor));
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
   * @param eleitor 
   */
  private openSidenav(eleitor: EleitorEntity): void {
    this.eleitor = eleitor;
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
