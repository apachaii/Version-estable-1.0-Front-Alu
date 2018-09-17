import { Component } from '@angular/core';
// import * as crypto from 'crypto-js'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(){
    // var ciphertext = crypto.AES.encrypt('my message', 'secret key 123');
    // console.log(ciphertext);
    // var bytes  = crypto.AES.decrypt(ciphertext.toString(), 'secret key 123');
    // console.log(bytes);


  }
}
