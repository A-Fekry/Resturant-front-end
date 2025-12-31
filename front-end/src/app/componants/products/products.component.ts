import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../models/product';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {CardOrder} from '../../models/card-order';
import {AuthService} from "../../service/auth/auth.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  pageNumber = 1;
  pageSize = 10;
  collectionSize: number;
  products: Product[] = [];
  messageAr = '';
  messageEn = '';
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private orderService: OrderService, private auth: AuthService) { }

  ngOnInit(): void {
    this.finalProducts(this.pageNumber);
  }


  finalProducts(pageNo): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const exactId = params.has('id');
      const exactKey = params.has('key');
      if (exactId){
        const id = params.get('id');
        this.loadByCategoryId(id , this.pageNumber);
      } else if (exactKey && params.get('key') !== ''){
        const key = params.get('key');
        this.searchProducts(key , this.pageNumber);
      } else {
        this.loadAllProducts(this.pageNumber);
      }
    });
  }

  loadAllProducts(pageNo): void {
    this.productService.loadProducts(pageNo - 1, this.pageSize).subscribe(
      response => {
        // @ts-ignore
        this.products = response.products;
        // @ts-ignore
        this.collectionSize = response.total;
      }
    );
  }

  searchProducts(key , pageNo): void {
    this.productService.searchByLetters(key , pageNo - 1, this.pageSize).subscribe(response =>
      {
        debugger;
        // @ts-ignore
        if (response && 'status' in response && response.status == 500){
          this.products = [];
          // @ts-ignore
          this.messageAr = response.messageAr;
          // @ts-ignore
          this.messageEn = response.messageEn;
        } else {
        // @ts-ignore
        this.products = response.products;
        // @ts-ignore
        this.collectionSize = response.total;
        }
      }
    );
  }

  loadByCategoryId(categoryId , pageNo): void {
    this.productService.getProductByCategoryId(categoryId , pageNo - 1, this.pageSize).subscribe(response => {
      // @ts-ignore
      this.products = response.products;
      // @ts-ignore
      this.collectionSize = response.total;
      if (this.products.length === 0){
        this.messageEn = 'we will add more soon';
        this.messageAr = 'سوف نضيف المزيد قريبًا.';
      }
    });
  }
  // tslint:disable-next-line:typedef
  addProduct(pro: Product) {
    debugger;
    // @ts-ignore
    const ord: CardOrder = new CardOrder(pro);
    this.orderService.addOrderToCard(ord);
  }
  // tslint:disable-next-line:typedef
  doPagination(){
    this.finalProducts(this.pageNumber);
  }
  isUserLogin(){
    return this.auth.isUserLogin();
  }
}
