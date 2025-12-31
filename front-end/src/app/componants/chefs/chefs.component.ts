import { Component, OnInit } from '@angular/core';
import {ChefService} from '../../service/chef.service';
import {Chef} from '../../models/chef';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
  chefs: Chef[] = [];

  constructor(private chefService: ChefService) { }

  ngOnInit(): void {
    this.finalChefs();
  }

  finalChefs(): void {
    this.getAllChefs();
  }

  getAllChefs(): void{
    debugger;
    this.chefService.getChefs().subscribe(
      response => {
        this.chefs = response;
      }
    );
  }
}
