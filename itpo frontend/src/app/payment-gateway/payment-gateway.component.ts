import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AES } from 'crypto-js';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css'],
})
export class PaymentGatewayComponent implements OnInit {
  encryptedUrl!: string;

  constructor() {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm) {
    const data = {
      merchantid: '234165',
      'mandatory fields': '456789|45|10|x|x|x|x',
      'optional fields': '',
      returnurl:
        'https://onlinespacebooking.indiatradefair.com/litf2k20/frontend/web/site/payresponse',
      'Reference No': '456789',
      submerchantid: '45',
      'transaction amount': '10',
      paymode: '9',
    };

    const secretKey = '23000729416001260';
    const encryptedData = AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();

    const paymentUrl = `https://eazypay.icicibank.com/EazyPG?${encryptedData}`;

    this.encryptedUrl = paymentUrl;

    window.location.href = this.encryptedUrl;
  }
}
