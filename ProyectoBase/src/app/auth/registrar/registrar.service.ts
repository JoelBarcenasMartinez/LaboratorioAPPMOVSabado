import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { HttpService } from 'src/app/service/http-services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService extends HttpService<Usuario>{

  constructor(protected http: HttpClient) {
    super(http, Usuario.endPoint);
  }

  public getAll(): Observable<Usuario> {
    return super.getAll();
  }

  public save(usuario: Usuario): Observable<Usuario>{
    return super.save(usuario);
  }
}
