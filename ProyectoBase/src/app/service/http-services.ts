import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class HttpService<T> {

  endPoint: string;

  constructor(protected http: HttpClient, private urlEndpoint: string){
    this.endPoint = environment.apiUrl + urlEndpoint;
  }

  protected get(paramsObject: HttpParams): Observable<T> {
    return this.http.get<T>(this.endPoint, {
      params: paramsObject
    }) as Observable<T>;
  }

  protected getAll(): Observable<T> {
    return this.http.get(this.endPoint) as Observable<T>;
  }

  protected save(object: T): Observable<T> {
    return this.http.post<T>(this.endPoint, object);
  }

  protected update(object: T, id: number) {
    return this.http.put(this.endPoint + '/' + id, object);
  }

  protected delete(id: number) {
    return this.http.delete(this.endPoint + '/' + id);
  }

}
