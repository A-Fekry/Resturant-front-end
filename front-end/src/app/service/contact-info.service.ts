import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContactInfo} from '../models/contact-info';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {
  baseUrl = 'http://localhost:8333/contact/';
  constructor(private http: HttpClient) { }
  saveContactInfo(contactInfo: ContactInfo): Observable<any> {
    return this.http.post(`${this.baseUrl}save`, contactInfo).pipe(
      map(response => response)
    );
  }
}
