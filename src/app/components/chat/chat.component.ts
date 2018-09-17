
import { AfterViewChecked,ElementRef,Component, ViewChild, OnInit } from '@angular/core';
import { ChatService, Message } from '../../services/chat.service';
import { VozService } from '../../services/voz.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import { empty } from 'rxjs/Observer';
import { concat } from 'rxjs/operators/concat';

import {SimpleCrypt} from "ngx-simple-crypt";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  messages: Observable<Message[]>;
  formValue: string;
  constructor(public chat: ChatService,private speech: VozService) { 
    window.addEventListener("keypress", function(event){
      if (event.keyCode == 13){
          event.preventDefault();
      }
  }, false);
  
   this.formValue = null;
   //++++++++++++++++++++++++++++++++++++++++++++++++
  //  let simpleCrypt = new SimpleCrypt();
  //  let encodedString = simpleCrypt.encode("my-key","usted deve mucho mucho");
  //  console.log(encodedString);// "NBZYSwQLCFlDBBFZHgxdGwoKCB0NHwpZHxxMD0UNBRBe" 
  //  let decodedString = simpleCrypt.decode("my-key",encodedString);
  //  console.log(decodedString);// "You are not supposed to read this"
  //++++++++++++++++++++++++++++++++++++++++++++++++
  }
  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );

        this.scrollToBottom();
        console.log(this.messages);
        // this.chat.converse('hola') DESCOMENTAR
        this.chat.converse('unka38')

  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  sendMessage() {
    if(this.formValue == null){
     console.error('error chat vacio');
     alert('debes escribir algo');
     if(this.formValue.length == 0){
      console.error('error chat vacio');
      alert('debes escribir algo');
     }
    }else{
      if(this.formValue.length != 0){
        // this.chat.converse(this.formValue);   DESCOMENTAR
        this.chat.converse(this.formValue);
        console.log(this.formValue.length);
      }

    }
    
    this.formValue = '';
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  Activar(conf:boolean){
    console.log(conf);
    if(conf){
     this.speech.callar();
     conf = false;
    }
    if(!conf)
    {
     this.speech.record('es_MX')
     .subscribe(e => this.formValue = e)
    }
     
  }
}
