import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
var $;
@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent implements OnInit {

  constructor(public chat: ChatService) 
  {
    this.chat.conversation == null;
   }

  ngOnInit() {

    $('.carousel').carousel({
      interval: 2000
    });

  }

  

}

 
