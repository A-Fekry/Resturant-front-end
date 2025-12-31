import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Category[] = [];
  constructor(private categoryService: CategoryService, private router: Router , private authService: AuthService) { }
  ngOnInit(): void {
    this.loadAllCategory();
  }

  // tslint:disable-next-line:typedef
  loadAllCategory(){
    this.categoryService.loadAllCategories().subscribe(
      response => (
        this.categories = response)
    );
  }

  // tslint:disable-next-line:typedef
  search(keySearch){
    this.router.navigateByUrl(`/search/` + keySearch);
  }

  // tslint:disable-next-line:typedef
  isUserLogin(){
    return this.authService.isUserLogin();
  }

  // tslint:disable-next-line:typedef
  logOut(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  login(){
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  signup(){
    this.router.navigate(['/signup']);
  }
  addProduct(){
    this.router.navigate(['/add-product']);
  }
  isAdmin(){
    return this.authService.isUserAdmin();
  }
}
