import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedIn = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  public createUser(user: any) {
    const apiURL = environment.apiUrl + 'user'
    return this.httpClient.post(apiURL, user);
  }

  public loginUser(params: any) {
    const apiURL = environment.apiUrl + 'user/' + params.email + "/" + params.password;
    return this.httpClient.get(apiURL);
  }


  sendMessage(value: boolean) {
    this.isLoggedIn.next(value);
  }


  getMessage(): Observable<any> {
    return this.isLoggedIn.asObservable();
  }
}
