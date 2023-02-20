import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/shared/services/http.service';
// import { url } from 'inspector';
import { DatePipe } from '@angular/common';
// import { PaymentGatewayComponent } from 'src/app/payment-gateway/payment-gateway.component';
import * as CryptoJS from 'crypto-js';
import { encode } from 'base-64';
@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})
export class AddTicketComponent implements OnInit {
  myForm!: FormGroup;
  arr!: FormArray;

  city: any;
  ticketData: any;
  id: any;
  private _Activatedroute: any;
  price: any;
  date: any;

  myDatepipe: any;
  cheksumData: any;
  parmasData: any;

  constructor(
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
    private httpService: HttpService,
    private route: Router,
    private datepipe: DatePipe
  ) {
    console.log(Math.random().toString(36).slice(36) + new Date().getTime());
    // stringArr.push(S4);)
    this.myDatepipe = datepipe;
    // this.id=this.activedRoute.snapshot.paramMap.get('id')

    this.id = this.activedRoute.snapshot.paramMap.get('id');
    // console.log("Hi i'm vibhu")
    console.log(this.id);
    // this.httpService
    // .gettickettypebyid(this.id)
    // .subscribe((data: any) => {
    //   console.log(data,"farmer data by id");
    //   this.ticketData=data.data;
    // })
    let ORDERID =
      'IITF' + Math.random().toString(36).slice(36) + new Date().getTime();
    // console.log(ORDERID)

    this.myForm = this.fb.group({
      arr: this.fb.array([this.createItem()]),

      mobile: ['', Validators.required],
      name: ['', Validators.required],

      totalPrice: ['0'],
      totalTicket: ['0'],
      email: ['', Validators.required],
      ORDERID: [ORDERID],
    });

    console.log('value: ', this.myForm.value);
  }

  ngOnInit(): void {
    // this.myForm = this.fb.group({
    //   arr: this.fb.array([this.createItem()])
    // })
  }
  createItem() {
    return this.fb.group({
      citizentype: [''],
      date: [''],
      ticketid: [''],
      price: [''],
      totalPrice: [''],

      count: ['0'],
    });
  }

  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  getState(i: any) {
    let controls = this.myForm.get('arr') as FormArray;
    if (controls.at(i).value.ticketid !== '63f344ce76d234fb4402352b') {
      this.httpService
        .getpricebyid({ ticketid: controls.at(i).value.ticketid })
        .subscribe((data: any) => {
          this.price = data?.resultData[0];
          controls.at(i).get('price')?.setValue(this.price?.price);
          let amount =
            Number(this.price?.price) * Number(controls.at(i).value.count);
          controls.at(i).get('totalPrice')?.setValue(amount);
          controls.updateValueAndValidity();
          console.log(this.price);
        });
    } else if (controls.at(i).value.citizentype && controls.at(i).value.date) {
      const ConvertedDate = this.myDatepipe.transform(
        controls.at(i).value.date,
        'dd-MM-yyyy'
      );
      this.httpService
        .getpricebycitizentype({
          citizentype: controls.at(i).value.citizentype,
          id: controls.at(i).value.id,
          date: ConvertedDate,
        })
        .subscribe((data: any) => {
          this.price = data?.resultData[0];
          console.log(this.date);
          controls.at(i).get('price')?.setValue(this.price?.price);
          let amount =
            Number(this.price?.price) * Number(controls.at(i).value.count);
          controls.at(i).get('totalPrice')?.setValue(amount);
          controls.updateValueAndValidity();
          // console.log(this.price)
        });
    } else {
    }

    let j = controls.length;
    this.myForm.get('totalTicket')?.setValue(0);

    this.myForm.get('totalPrice')?.setValue(0);
    this.myForm.updateValueAndValidity();
    while (j) {
      let i = j - 1;
      let count = controls.at(i).value.count;
      console.log(count);
      let price = controls.at(i).value.price;
      let totalCount = Number(this.myForm.value.totalTicket) + Number(count);
      this.myForm.get('totalTicket')?.setValue(totalCount);
      let totalAmount =
        Number(this.myForm.value.totalPrice) + Number(price) * Number(count);
      this.myForm.get('totalPrice')?.setValue(totalAmount);
      this.myForm.updateValueAndValidity();
      j--;
    }
  }
  calculate(i: any) {
    console.log(i);
    let controls = this.myForm.get('arr') as FormArray;
    let option: any = controls.at(i).get('ticketid');
    let opt = option.value; //price
    //console.log(opt);

    let num: any = controls.at(i).get('count'); //count
    //console.log("count=",num.value);
    let totalAmount = Number(opt) * Number(num.value);
    //console.log(totalAmount);
    //this.myForm.value.totalPrice=totalAmount;
    controls.at(i).get('totalPrice')?.setValue(totalAmount);
    let sum = 0;
    for (let j = 0; j < controls.length; j++) {
      //find total amount from all list
      sum = sum + Number(controls.at(j).get('totalPrice')?.value);
    }
    // let totalCount = Number(this.myForm.get('totalPrice')?.value) + totalAmount;
    this.myForm.get('totalPrice')?.setValue(sum);
    // let total:any=document.getElementById("totalPre");
    // total.value=totalAmount;

    //console.log(option.value);
  }

  removeItem(i: any) {
    let controls = this.myForm.get('arr') as FormArray;
    controls.removeAt(i);
    controls.updateValueAndValidity();
    let j = controls.length;
    this.myForm.get('totalTicket')?.setValue(0);

    this.myForm.get('totalPrice')?.setValue(0);
    this.myForm.updateValueAndValidity();
    while (j) {
      let i = j - 1;
      let count = controls.at(i).value.count;
      console.log(count);
      let price = controls.at(i).value.price;
      let totalCount = Number(this.myForm.value.totalTicket) + Number(count);
      this.myForm.get('totalTicket')?.setValue(totalCount);
      let totalAmount =
        Number(this.myForm.value.totalPrice) + Number(price) * Number(count);
      this.myForm.get('totalPrice')?.setValue(totalAmount);
      this.myForm.updateValueAndValidity();
      j--;
    }
    let sum = 0;
    for (let k = 0; k < controls.length; k++) {
      //find total amount from all list
      sum = sum + Number(controls.at(k).get('totalPrice')?.value);
    }
    // let totalCount = Number(this.myForm.get('totalPrice')?.value) + totalAmount;
    this.myForm.get('totalPrice')?.setValue(sum);
  }

  onSubmit() {
    console.log(this.myForm);

    if (this.myForm.valid) {
      console.log(this.myForm.value);
      let controls = this.myForm.get('arr') as FormArray;
      let j = controls.length;
      while (j) {
        let i = j - 1;
        let count = Number(controls.at(i).value.count);

        while (count) {
          //   console.log({
          //     name:this.myForm.value.name,
          //     email:this.myForm.value.email,
          //     mobile:this.myForm.value.mobile,
          //      date:controls.at(i).value.date,
          //     citizentype:controls.at(i).value.citizentype,

          //     price:controls.at(i).value.price,
          //   qty:"1",
          //     ticketid:controls.at(i).value.ticketid
          // })
          this.httpService
            .addpaymnet({
              name: this.myForm.value.name,
              email: this.myForm.value.email,
              mobile: this.myForm.value.mobile,
              date: controls.at(i).value.date,
              citizentype: controls.at(i).value.citizentype,
              ORDERID: this.myForm.value.ORDERID,
              price: controls.at(i).value.price,
              qty: '1',
              ticketid: controls.at(i).value.ticketid,
            })
            .subscribe(
              (data: any) => {
                this.payNow();
                // let  url='/pay/'+this.myForm.value.mobile
                // this.route.navigate([url])
                // Swal.fire('Ticket Booked Succsefully Please Check Your Email and Phone','','success')

                // location.reload()
              },
              (err: any) => {
                Swal.fire('Something went Wrong', '', 'error');
              }
            );
          count--;
        }
        j--;
      }
    } else {
      // this.mandi.dirty=true
      Swal.fire('Please fill All Required Field', '', 'error');
    }
  }

  get employees(): FormArray {
    return this.myForm.get('arr') as FormArray;
  }

  // -------- Counter --------

  counter = 0;

  increment(i: any) {
    let controls = this.myForm.get('arr') as FormArray;
    let count = Number(controls.at(i).value.count);
    if (count != 10) {
      count = count + 1;
    }
    controls.at(i).get('count')?.setValue(count);
    let amount =
      Number(controls.at(i).value.price) * Number(controls.at(i).value.count);
    controls.at(i).get('totalPrice')?.setValue(amount);
    // controls.updateValueAndValidity()
    controls.updateValueAndValidity();
    let j = controls.length;
    this.myForm.get('totalTicket')?.setValue(0);

    this.myForm.get('totalPrice')?.setValue(0);
    this.myForm.updateValueAndValidity();
    while (j) {
      let i = j - 1;
      let count = controls.at(i).value.count;
      console.log(count);
      let price = controls.at(i).value.price;
      let totalCount = Number(this.myForm.value.totalTicket) + Number(count);
      this.myForm.get('totalTicket')?.setValue(totalCount);
      let totalAmount =
        Number(this.myForm.value.totalPrice) + Number(price) * Number(count);
      this.myForm.get('totalPrice')?.setValue(totalAmount);
      this.myForm.updateValueAndValidity();
      j--;
    }
    this.calculate(i);
  }

  decrement(i: any) {
    let controls = this.myForm.get('arr') as FormArray;

    let count = 0;
    if (Number(controls.at(i).value.count) != 0) {
      count = Number(controls.at(i).value.count) - 1;
      let amount =
        Number(controls.at(i).value.price) * Number(controls.at(i).value.count);
      controls.at(i).get('totalPrice')?.setValue(amount);

      // controls.updateValueAndValidity()
    }

    controls.at(i).get('count')?.setValue(count);
    controls.updateValueAndValidity();

    let j = controls.length;
    this.myForm.get('totalTicket')?.setValue(0);

    this.myForm.get('totalPrice')?.setValue(0);
    this.myForm.updateValueAndValidity();
    while (j) {
      let i = j - 1;
      let count = controls.at(i).value.count;
      console.log(count);
      let price = controls.at(i).value.price;
      let totalCount = Number(this.myForm.value.totalTicket) + Number(count);
      this.myForm.get('totalTicket')?.setValue(totalCount);
      let totalAmount =
        Number(this.myForm.value.totalPrice) + Number(price) * Number(count);
      this.myForm.get('totalPrice')?.setValue(totalAmount);
      this.myForm.updateValueAndValidity();
      j--;
    }
    this.calculate(i);
  }

  payNow() {
    this.httpService
      .payNow({
        price: this.myForm.value.totalPrice,
        name: this.myForm.value.name,
        email: this.myForm.value.email,
        mobile: this.myForm.value.mobile,
        ORDERID: this.myForm.value.ORDERID,
      })
      .subscribe(
        (data: any) => {
          this.cheksumData = data?.data;
          this.parmasData = data?.params;
          // Swal.fire('Ticket Booked Succsefully Please Check Your Email and Phone','','success')
          // location.reload()2300072941601260
        },
        (err: any) => {
          // Swal.fire('Something went Wrong','','error')
          console.log(err);
        }
      );
  }
  aesKey: string = '2300072941601260';

  optionalFields: string = '';
  returnUrl: string =
    'https://onlinespacebooking.indiatradefair.com/iitf2k20/frontend/web/site/payresponse';
  referenceNo: string = Math.floor(100000 + Math.random() * 900000).toString();
  subMerchantId: string = '45';
  transactionAmount: string = this.myForm?.get('totalPrice')?.value;
  payMode: string = '9';
  name: string = 'x';
  bookingId: string = 'x';
  eventName: string = 'x';
  participationType: string = 'x';
  mandatoryFields: string = `${this.referenceNo}|${this.subMerchantId}|${this.transactionAmount}|${this.name}|${this.bookingId}|${this.eventName}|${this.participationType}`;

  encryptFile(key: string, inputParam: string): string {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const ivBytes = CryptoJS.enc.Utf8.parse('');

    const encrypted = CryptoJS.AES.encrypt(inputParam, keyBytes, {
      iv: ivBytes,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  onFormSubmit(): void {
    const mandatoryFieldsEncrypted = this.encryptFile(
      this.aesKey,
      `${this.referenceNo}|${this.subMerchantId}|${this.myForm.value.totalPrice}|${this.name}|${this.bookingId}|${this.eventName}|${this.participationType}`
    );
    const optionalFieldsEncrypted = this.encryptFile(
      this.aesKey,
      this.optionalFields
    );
    const returnUrlEncrypted = this.encryptFile(this.aesKey, this.returnUrl);
    const referenceNoEncrypted = this.encryptFile(
      this.aesKey,
      this.referenceNo
    );
    const subMerchantIdEncrypted = this.encryptFile(
      this.aesKey,
      this.subMerchantId
    );
    const transactionAmountEncrypted = this.encryptFile(
      this.aesKey,
      String(this.myForm.value.totalPrice)
    );
    const payModeEncrypted = this.encryptFile(this.aesKey, this.payMode);
    console.log(
      mandatoryFieldsEncrypted,
      optionalFieldsEncrypted,
      returnUrlEncrypted,
      referenceNoEncrypted,
      transactionAmountEncrypted
    );

    const url = `https://eazypay.icicibank.com/EazyPG?merchantid=234165&mandatory fields=${mandatoryFieldsEncrypted}&optional fields=&returnurl=${returnUrlEncrypted}&Reference No=${referenceNoEncrypted}&submerchantid=${subMerchantIdEncrypted}&transaction amount=${transactionAmountEncrypted}&paymode=${payModeEncrypted}`;

    window.location.href = url;
  }
}
