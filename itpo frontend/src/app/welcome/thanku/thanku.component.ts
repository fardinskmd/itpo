import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-thanku',
//   templateUrl: './thanku.component.html',
//   styleUrls: ['./thanku.component.css']
// })
// export class ThankuComponent implements OnInit {

//   id: any;
//   EditData: any;
//   urnno:any

//   constructor(private httpService:HttpService,private _Activatedroute: ActivatedRoute,) { }

//   ngOnInit(): void {
//     this.id = this._Activatedroute.snapshot.paramMap.get('id');

//     this.httpService
//     .getdetailbyurnnombers(this.id)
//     .subscribe((data: any) => {
//       console.log(data,"farmer data by id");
//       this.EditData=data.resultData;
//     })
//   }

// }

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-response-handler',
  template: `
    <div *ngIf="processing">
      <h2>ThANK YOU...</h2>
    </div>
    <div *ngIf="paymentResult">
      <h2>Payment {{ paymentResult.success ? 'Successful' : 'Failed' }}</h2>
      <p>{{ paymentResult.message }}</p>
    </div>
  `,
})
export class ThankuComponent implements OnInit {
  processing = true;
  paymentResult: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const responseCode = this.route.snapshot.queryParamMap.get('ResponseCode');
    const referenceNo = this.route.snapshot.queryParamMap.get('ReferenceNo');
    const subMerchantId =
      this.route.snapshot.queryParamMap.get('SubMerchantId');
    const amount = this.route.snapshot.queryParamMap.get('Amount');

    const url = `https://onlinespacebooking.indiatradefair.com/iitf2k20/frontend/web/site/payresponse`;

    // const payload = {
    //   responseCode: responseCode,
    //   referenceNo: referenceNo,
    //   subMerchantId: subMerchantId,
    //   amount: amount,
    // };

    // this.http.post(url, payload).subscribe(
    //   (data: any) => {
    //     this.paymentResult = {
    //       success: true,
    //       message: 'Payment received and saved',
    //     };
    //     this.processing = false;
    //   },
    //   (error) => {
    //     this.paymentResult = {
    //       success: false,
    //       message: 'Error saving payment: ' + error,
    //     };
    //     this.processing = false;
    //   }
    // );
    console.log('hi from front');
  }
}
