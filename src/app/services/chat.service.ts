import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Alumno } from '../Interface/alumno.interface';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {SimpleCrypt} from "ngx-simple-crypt";
// Message class for displaying messages in the component

export class Message {
  constructor(public content: string, public sentBy: string) {}
}
@Injectable()
export class ChatService {
  public url2 = "http://localhost:5656/api/user"
  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);
  public user: Alumno = {
    pregunta: "",
    respuesta: " ",
    carrera: " ",
    seccion: " ",
    agente: " ",
    intencion: " ",
    rut: ""
  }
  public deudor:any = {
    nombre: "Unka",
    situacion: "Debe 15 millones de dolares",
    numero:"55555555555",
    fehcadepago: "",
    excusa: ""
  };
  
  constructor( private http: HttpClient ) {
  //   var s = "Informar situacion(externo)";
  // if (s.match(/(externo).*/)) {
  //   console.log("cohete");
  // }

  }
  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    return this.client.textRequest(msg)
               .then(res => {
                    //++++++++++++++++++++++++++++++++++++++++++++++++
                //   let simpleCrypt = new SimpleCrypt();
                  //   let encodedString = simpleCrypt.encode("my-key","usted deve mucho mucho");
                  //  console.log(encodedString);// "NBZYSwQLCFlDBBFZHgxdGwoKCB0NHwpZHxxMD0UNBRBe" 
                  //   let decodedString = simpleCrypt.decode("my-key",res.result.fulfillment.speech);
                  // console.log(decodedString);// "You are not supposed to read this"
                  //++++++++++++++++++++++++++++++++++++++++++++++++

                  // const speech = decodedString;
                  // const speech = res.result.fulfillment.speech+"Antonio";
                  var ff = res.result.resolvedQuery
                  let preg = "Ingenieria de software"
                  let gg =  res.result["metadata"]
                  let yy = gg["intentName"]
                  if (yy == "primero(externo)") {
                      
                      var speech = res.result.fulfillment.speech+" "+this.deudor.nombre+"?";
                    }
                   else if (yy == "Informar situacion(externo)") {
                        var speech = res.result.fulfillment.speech+" "+this.deudor.situacion+" ¿cuando se puede acercar a pagar?";
                        }
                        else if (yy == "Confirmar si corresponde numero") {
                          var speech = res.result.fulfillment.speech+" "+this.deudor.numero+" de don "+this.deudor.nombre;
                          }

                        else{
                              var speech = res.result.fulfillment.speech;
                            }
                if(yy == "Registrar nuevo numero"){
                  var regex = /(\d+)/g;
                  let nuevoNum = ff.match(regex);
                  this.deudor.numero = nuevoNum

                  console.log("nuevo numero: "+this.deudor.numero);
                }
                if(yy == "Ingreso compromiso de pago"){
                  let nuevafecha = ff
                  this.deudor.fehcadepago = nuevafecha;

                  console.log("nueva fecha: "+this.deudor.fehcadepago);
                }
                if(yy == "Ingreso excusas"){
                  let excusas= ff
                  this.deudor.excusa = excusas;

                  console.log("nueva excusa: "+this.deudor.excusa);
                }
                // if (yy == "primero(externo)") {
                //   console.log("gg")
                //   var speech = res.result.fulfillment.speech+" "+this.deudor.nombre;
                // }else{
                // if (yy == "Informar situacion(externo)") {
                //   var speech = res.result.fulfillment.speech+" "+this.deudor.situacion;
                //   }
                //   else{
                //     var speech = res.result.fulfillment.speech;
                //   }
                // }


                  this.user.pregunta = ff
                  this.user.respuesta = speech
                  this.user.carrera  = "ing informatica"
                  this.user.seccion = "640"
                  this.user.agente = preg
                  this.user.intencion = yy
                  this.user.rut = "11111111-k"

                  console.log(this.user);
                  const botMessage = new Message(speech, 'bot');
                  this.update(botMessage);

                  if(yy == "saludooficial" || yy == "Default Fallback Intent" || yy == "Default Welcome Intent" || yy == "adios"   ){
                    console.log("no se guarda");
                  }
                  else{
                    console.log("se guarda");
                    this.guardar(this.user)
                  }
                  
               });

              
  }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  guardar(usuario:Alumno){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    this.http.post(this.url2,JSON.stringify(usuario),{headers:headers})
    .subscribe(result=>{
      console.log(result);
    },
    error => { console.log(error) },
    () => {}
  );
  }

}