import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/service/http-services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuenta } from './../model/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService extends HttpService<Cuenta>{

  constructor(protected http: HttpClient) {
    super(http, Cuenta.endPoint);
  }

  public getAll(): Observable<Cuenta> {
    return super.getAll();
  }

  public save(cuenta: Cuenta): Observable<Cuenta>{
    return super.save(cuenta);
  }
}

