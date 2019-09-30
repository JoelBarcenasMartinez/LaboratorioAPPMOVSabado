import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
    return this.http.get(`${this.endPoint}`) as Observable<T>;
  }

  protected save(object: T): Observable<T> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' });
    const options = { headers };
    return this.http.post<T>(`${this.endPoint}`, object);
  }
  protected update(object: T, id: number): Observable<T> {
    return this.http.put<T>(`${this.endPoint}` + '/' + `${id}`, object);
  }

  protected delete(id: number):  Observable<T> {
    return this.http.delete<T>(`${this.endPoint}` + '/' + `${id}`);
  }

}
