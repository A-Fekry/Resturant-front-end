import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  messageAr: String = '';
  // tslint:disable-next-line:ban-types
  messageEn: String = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:typedef
  login(userName, password) {
    if (userName === '') {
      this.messageAr = 'يجب ادخال الايميل';
      this.messageEn = 'please enter your email';
      this.extracted();
      return;
    }

    if (password === '') {
      this.messageAr = 'يجب ادخال الرقم السري';
      this.messageEn = 'please enter your password';
      this.extracted();
      return;
    }
    this.authService.login(userName, password).subscribe(
      (response) => {
        if (response.status) {
          this.messageAr = response.messageAr;
          this.messageEn = response.messageEn;
          this.extracted();
        } else if (response.token) {
          sessionStorage.setItem('token', 'Bearer ' + response.token);
          sessionStorage.setItem('roles',response.roles);
          this.router.navigateByUrl('/products');
        }
      }
    );
  }

  // tslint:disable-next-line:typedef
  private extracted() {
    setTimeout(() => {
      this.messageAr = '';
      this.messageEn = '';
    }, 3000);
  }

}
