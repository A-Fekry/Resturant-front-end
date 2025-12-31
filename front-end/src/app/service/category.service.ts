import { Injectable } from '@angular/core';
import {Category} from '../models/Category';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'http://localhost:8333/category/get-all-categories';

  constructor(private http: HttpClient) { }

  loadAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl).pipe(
      map(response => response)
    );
  }
}
