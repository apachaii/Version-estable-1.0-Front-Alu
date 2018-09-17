import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { empty } from 'rxjs/Observer';
import {Satisfaccion} from '../../Interface/satisfacion.interface'
import { SatisService } from '../../services/satis.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.css']
})
export class RequisitosComponent implements OnInit {
public satis:Satisfaccion = {
  comentario: null,
  valoracion: null,
  comentario_NLU: null,
}
public forma:NgForm
  constructor(private chat: ChatService, private satserv:SatisService) 
  {

    this.chat.converse == null;
   }

  ngOnInit() {
  }
  calificar(){
    // this.satserv.analisis(this.satis) DESCOMENTAR
     this.satserv.analisis(this.satis)
      alert("Mensaje enviado con éxito")

     
  }

}
