import {HttpHeaders} from "@angular/common/http";


export class mojConfig{
  static adresa_servera = "https://localhost:44383/";
  static http_opcije= {
    headers: new HttpHeaders({"Content-Type":"application/json"})
};
}

