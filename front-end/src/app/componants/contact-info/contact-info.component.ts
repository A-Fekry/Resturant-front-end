import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ContactInfoService} from '../../service/contact-info.service';
import {ContactInfo} from '../../models/contact-info';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  contactInfo: ContactInfo = {
    id: null,
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  messageAr = '';
  messageEn = '';
  constructor(private router: Router, private contactInfoService: ContactInfoService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.contactInfoService.saveContactInfo(this.contactInfo).subscribe(

      // success
      response => {
        if (!response) {
          // مفيش response → navigate
          this.router.navigate(['/products']);
        } else {
          this.messageAr = response.messageAr;
          this.messageEn = response.messageEn;
          this.extracted();
        }
      },

      // exception
      error => {
        this.messageAr = 'حدث خطأ';
        this.messageEn = 'Something went wrong';
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
