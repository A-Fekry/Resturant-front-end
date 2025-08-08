import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-display-code',
  templateUrl: './display-code.component.html',
  styleUrls: ['./display-code.component.css']
})
export class DisplayCodeComponent implements OnInit {

  code: string = undefined;

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCode();
  }
  getCode(){
    // @ts-ignore
    this.code = this.orderService.code;
  }

  goToMain(){
    this.router.navigateByUrl('/products');
  }
}
