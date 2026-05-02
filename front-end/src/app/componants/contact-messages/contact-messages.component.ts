import { Component, OnInit } from '@angular/core';
import {ContactInfo} from '../../models/contact-info';
import {ContactInfoService} from '../../service/contact-info.service';
import {AuthService} from '../../service/auth/auth.service';


@Component({
  selector: 'app-contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrls: ['./contact-messages.component.css']
})
export class ContactMessagesComponent implements OnInit {

  messages: ContactInfo[] = [];
  isAdmin = false;

  constructor(
    private service: ContactInfoService,
    private clientService: AuthService
  ) {}

  ngOnInit(): void {

    // check admin
    this.isAdmin = this.clientService.isUserAdmin();

    // لو مش admin → متجيبش البيانات
    if (!this.isAdmin) { return; }

    this.loadMessages();
  }

  loadMessages(): void {
    this.service.getAll().subscribe(data => {
      this.messages = data;
    });
  }
}
