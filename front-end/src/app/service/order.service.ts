import { Injectable } from '@angular/core';
import {CardOrder} from '../models/card-order';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'http://localhost:8333/order';
  constructor(private http: HttpClient,private router: Router) { }
  orders: CardOrder[] = [];
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  code: String = '';
  addOrderToCard(order: CardOrder): void {
    let isExist  = false;
    let existedCardOrder: CardOrder;
    existedCardOrder = undefined;

    if (this.orders.length !== 0){
      // @ts-ignore
      existedCardOrder = this.orders.find(o => o.id === order.id);
    }
    isExist = (existedCardOrder !== undefined);
    if (isExist){
      existedCardOrder.quantity++;
    } else {
      this.orders.push(order);
    }
    this.getTotals();
  }

  getTotals(): void {
    let totalSize = 0;
    let tatalPrice = 0;
    for (const temp of this.orders){
      totalSize += temp.quantity;
      tatalPrice += temp.price * temp.quantity;
    }

    this.totalPrice.next(tatalPrice);
    this.totalQuantity.next(totalSize);
  }

  removeOrder(order: CardOrder): void {
    this.orders.splice(this.orders.indexOf(order), 1);
    this.getTotals();
  }

  deCreaseOrder(or: CardOrder): void {
    if (or.quantity === 1)
    {
      this.removeOrder(or);
    } else {
      or.quantity--;
    }
    this.getTotals();
  }

  saveOrder(totalPrice, quantity, productIds: number[], productsQuantity: number[]): void {
    this.http.post<{ code: string }>(this.baseUrl + '/save', {
      totalPrice,
      quantity,
      productIds,
      productsQuantity
    }).pipe(
      map(response => {
        this.code = response.code;
        return response;
      })
    ).subscribe(response => {
      this.orders = [];
      this.totalPrice.next(0); // fixed
      this.totalQuantity.next(0); // fixed
      this.router.navigateByUrl('/display-code');
    });
  }

}
