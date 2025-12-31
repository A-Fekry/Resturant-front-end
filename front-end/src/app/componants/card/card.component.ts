import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  totalSize = 0;
  totalPrice = 0;

  constructor(private cartService: OrderService) {
  }

  ngOnInit(): void {
    this.getTotals();
  }

  // tslint:disable-next-line:typedef
  getTotals(){
    debugger;
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalSize = data;
      }
    );

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );
  }
}
