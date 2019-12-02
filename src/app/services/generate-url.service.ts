import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateUrlService {

  constructor(private httpClient: HttpClient) { }

  public generateUrl(item: any) {
    const apiURL = environment.apiUrl + 'item'
    return this.httpClient.post(apiURL, item).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return Observable.throw(error);
      })
    );;
  }

  public getUrl(param: any) {
    const apiURL = environment.apiUrl + 'item/' + param;
    return this.httpClient.get(apiURL).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return Observable.throw(error);
      })
    );
  }
}
