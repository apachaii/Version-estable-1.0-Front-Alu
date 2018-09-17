import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { ChatService } from './services/chat.service';
import { VozService } from './services/voz.service';
import { SatisService } from './services/satis.service';

import { HomeComponent } from './components/home/home.component';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';
import { RequisitosComponent } from './components/requisitos/requisitos.component';
import { ChatComponent } from './components/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {appRoutingProviders,routing} from './app.routing';
import { MenuComponent } from './components/menu/menu.component';
import { ReferenciasComponent } from './components/referencias/referencias.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstruccionesComponent,
    RequisitosComponent,
    ChatComponent,
    NavbarComponent,
    MenuComponent,
    ReferenciasComponent
  ],
  imports: [
    BrowserModule,
    routing,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [ ChatComponent ],
  providers: [
    appRoutingProviders,
    ChatService,
    VozService,
    SatisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
