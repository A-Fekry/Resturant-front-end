/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../service/auth/auth.service";
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {ProductService} from "../../service/product.service";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = new Product();
  proRes: Product = undefined;
  catName: string;
  categories: Category[] = [];
  messageAr = '';
  messageEn = '';
  constructor(private router: Router , private authService: AuthService, private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  onSubmit(): void {
    this.productService.addProduct(this.product,this.catName).subscribe(
      response => {
        if (response["status"]) {
        this.messageAr = response["messageAr"];
        this.messageEn = response["messageEn"];
        this.extracted();
        } else {
          this.proRes = response
        }

      }
    );
  }
  isAdmin(){
    return this.authService.isUserAdmin();
  }
  getAllCategory(){
    this.categoryService.loadAllCategories().subscribe(
      response => (
        this.categories = response)
    );
  }
  returnToMain(){
    this.router.navigate(['/products']);
  }
  // tslint:disable-next-line:typedef
  private extracted() {
    setTimeout(() => {
      this.messageAr = '';
      this.messageEn = '';
    }, 3000);
  }
}


