import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CidadeComponent } from './cidade/cidade.component';
import { TabelaprecoComponent } from './tabelapreco/tabelapreco.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProdutoComponent } from './produto/produto.component';
import { PedidoComponent } from './pedido/pedido.component';

import { ItempedidoDialogComponent } from './_components/itempedido-dialog/itempedido-dialog.component';
import { ConfirmDialogComponent } from './_components/confirm-dialog/confirm-dialog.component';


import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule} from '@angular/material/badge';

//Socket.IO
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
const socketConfig: SocketIoConfig = {url: environment.urlSaaS, options:{}};


//Locale do Brasil
import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TotalPedidoPipe } from './_pipes/total-pedido.pipe';
registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    CidadeComponent,
    ConfirmDialogComponent,
    TabelaprecoComponent,
    ProdutoComponent,
    ClienteComponent,
    PedidoComponent,
    ItempedidoDialogComponent,
    TotalPedidoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [
   {provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
