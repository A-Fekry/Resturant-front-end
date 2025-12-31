import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:8333/product';
  constructor(private http: HttpClient) { }

  loadProducts(pageNo , pageSize): Observable<Product[]> {
    // @ts-ignore
    return this.http.get<Product[]>(this.baseUrl + '/pageNo/' + pageNo + '/pageSize/' + pageSize).pipe(
      map(response => response)
    );
  }

  getProductByCategoryId(id: number , pageNo , pageSize): Observable<Product[]> {
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this.http.get<Product[]>(this.baseUrl + '/get-product-by-category-id/' + id + '/pageNo/' + pageNo + '/pageSize/' + pageSize).pipe(
      map(response => response)
    );
  }

  searchByLetters(searchTerm: string , pageNo , pageSize): Observable<Product[]> {
    // @ts-ignore
    return this.http.get<Product[]>(this.baseUrl + '/search-by-letters/' + searchTerm + '/pageNo/' + pageNo + '/pageSize/' + pageSize).pipe(
      map(response => response)
    );
  }
  addProduct(productDto: Product,catName: String) : Observable<Product> {
    return this.http.post<Product>(this.baseUrl + '/save',{productDto , catName}).pipe(
      map(response => response)
    )
  }
}
