import {HttpHeaders} from "@angular/common/http";


export class aplication_settings{
  static damir_local ="https://localhost:44383/"
  private static armin_local ="https://localhost:44383/cinestar_api/seminarski/"
  static cinestar__plesk__server = "https://cinestar-api.p2098.app.fit.ba/cinestar_api/seminarski/";
  static cinestar__plesk__server_standard_endpoints = "https://cinestar-api.p2098.app.fit.ba/";
  static auth_server = "https://auth-server.p2098.app.fit.ba";

  static http_opcije= {
    headers: new HttpHeaders({"Content-Type":"application/json"})
  };

  static get arminURL():string{
    return this.armin_local;
  }

}


