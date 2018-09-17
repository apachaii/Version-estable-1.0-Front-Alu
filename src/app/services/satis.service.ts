import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Satisfaccion} from '../Interface/satisfacion.interface'

@Injectable()
export class SatisService {
  public urlA = "http://localhost:3678/api/mail"
  public urlG = "http://localhost:5656/api/sat"

  constructor(private http: HttpClient) { }

  analisis(satisf:Satisfaccion){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    this.http.post(this.urlA,JSON.stringify(satisf),{headers:headers})
    .subscribe(result=>{
      console.log(result);
      if(result["scoreDEF"]){
        console.log("no no se llama");
      }else{
        
        satisf.comentario_NLU = result["score"]

        console.log(satisf);
        this.guardar(satisf);
      }
      
    },
    error => { console.log(error) },
    () => {}
  );
  console.log(satisf)
  }

  guardar(sat:Satisfaccion){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    this.http.post(this.urlG,JSON.stringify(sat),{headers:headers})
    .subscribe(result=>{
      console.log(result);
    },
    error => { console.log(error) },
    () => {}
  );
  }
}
