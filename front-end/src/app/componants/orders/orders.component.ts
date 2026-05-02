import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../service/order.service';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    if(this.authService.isUserAdmin()) {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
    }
    else {
      this.orderService.getOrdersByUser().subscribe(data => {
        this.orders = data;
      });
    }
  }
}
