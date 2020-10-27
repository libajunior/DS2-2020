import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ProdutoEntity, ProdutoService } from 'src/app/_services/produto.service';
import { ItemPedidoEntity } from 'src/app/_services/pedido.service';
import { TabelaPrecoEntity } from 'src/app/_services/tabelapreco.service';

@Component({
  selector: 'app-itempedido-dialog',
  templateUrl: './itempedido-dialog.component.html',
  styleUrls: ['./itempedido-dialog.component.scss']
})
export class ItempedidoDialogComponent {

  public itemPedido: ItemPedidoEntity;
  public produtos: ProdutoEntity[] = [];
  private tabelapreco: TabelaPrecoEntity;

  constructor(private produtoService: ProdutoService, public dialogRef: MatDialogRef<ItempedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TabelaPrecoEntity) {
    this.itemPedido = new ItemPedidoEntity();

    this.tabelapreco = data;

    //Carrega todos os produtos
    this.produtoService.listarTodos().subscribe(result => {
      this.produtos = result as [];
    });
  }

  public onDismiss(): void {
    this.dialogRef.close(false);
  }

  public onConfirm(): void {
    this.dialogRef.close(this.itemPedido);
  }

  public changeItem(): void {
    //Aplica tabela preço se existir
    if (this.tabelapreco) {
      this.itemPedido.vlrunit = this.itemPedido.produto.preco * this.tabelapreco.fator;
    } else {
      this.itemPedido.vlrunit = this.itemPedido.produto.preco;
    }

    this.itemPedido.qtdade = 1;
  }

}
