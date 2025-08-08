import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {Router} from '@angular/router';
import {CardOrder} from '../../models/card-order';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  order: CardOrder[] = [];
  totalPrice : number = 0;
  totalSize : number = 0;
  constructor(private orderService: OrderService,private router: Router) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.order = this.orderService.orders;
  }

  increaseOrder(or: CardOrder): void {
    this.orderService.addOrderToCard(or);
  }

  removeOrder(or: CardOrder): void {
    this.orderService.removeOrder(or);
  }

  deCreaseOrder(or: CardOrder): void {
    this.orderService.deCreaseOrder(or);
  }

  createOrder(){
    debugger;
    const productIds = this.orderService.orders.map(o => o.id);
    const productQuan = this.orderService.orders.map(o => o.quantity);
    this.orderService.totalQuantity.subscribe(
      data => {
        this.totalSize = data;
      }
    );
    this.orderService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );

    this.orderService.saveOrder(this.totalPrice, this.totalSize, productIds, productQuan)

  }
}
