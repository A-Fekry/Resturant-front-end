import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Chef} from '../models/chef';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  baseUrl = 'http://localhost:8333/chef';
  constructor(private http: HttpClient) { }

  getChefs(): Observable<Chef[]> {
    debugger;
    return this.http.get<Chef[]>(this.baseUrl).pipe(
      map(response => response)
    );
  }
}
