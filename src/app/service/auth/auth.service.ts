import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:8333/auth';

  constructor(private http: HttpClient) { }

  login(userName, password): Observable<any> {
    // tslint:disable-next-line:no-debugger
     debugger;
     return  this.http.post(this.baseUrl + '/login', {userName, password}).pipe(
        map(response => response)
      );
  }

  createAccount(userName, phoneNumber, email, password): Observable<any> {
    return  this.http.post<any>(this.baseUrl + '/create-account', {userName, password, email, phoneNumber}).pipe(
      map(response => response)
    );
  }

  // tslint:disable-next-line:typedef
  isUserLogin(){
    return sessionStorage.getItem('token') != null && sessionStorage.getItem('token') !== undefined;
  }

  isUserAdmin(): boolean {
    debugger;
    const roles: string = sessionStorage.getItem('roles');

    try {
      return roles.includes('ROLE_ADMIN');
    } catch (e) {
      console.error('Invalid roles in sessionStorage', e);
      return false;
    }
  }

}
