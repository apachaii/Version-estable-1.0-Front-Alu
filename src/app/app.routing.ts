import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';
import { RequisitosComponent } from './components/requisitos/requisitos.component';
import { ReferenciasComponent } from './components/referencias/referencias.component';
import { MenuComponent } from './components/menu/menu.component';
const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ins', component: InstruccionesComponent },
  { path: 'req', component: RequisitosComponent },
  { path: 'ref', component: ReferenciasComponent },
  { path: 'menu', component: MenuComponent },
  { path: '**', redirectTo: 'chat',pathMatch: 'full' },
  
];


export const appRoutingProviders: any[] = [];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);