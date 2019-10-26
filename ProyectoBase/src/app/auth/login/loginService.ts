import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { HttpService } from 'src/app/service/http-services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpService<Usuario> {

  constructor(protected http: HttpClient) {
    super(http, Usuario.endPoint + '/login');
  }

  public Login(usuario: Usuario): Observable<Usuario> {
     const params = new HttpParams()
     .set('correo', usuario.correo)
     .set('contrasena', usuario.contrasena);
     return super.get(params);
  }

}
