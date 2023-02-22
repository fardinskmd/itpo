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

// import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thanku',
  template: `
    <div *ngIf="isLoading">Loading...</div>
    <div *ngIf="!isLoading">
      <h1>{{ message }}</h1>
    </div>
  `,
})
export class ThankuComponent implements OnInit {
  isLoading = true;
  message = 'welcome to the page';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const responseCode = 'E000'; // replace with actual response code
    console.log('response code=', responseCode);

    this.http.get(`/thankuPage?Response_Code=${responseCode}`).subscribe(
      (res: any) => {
        this.isLoading = false;

        if (responseCode === 'E000') {
          this.message = 'Payment Successful!';
        } else {
          this.message = 'Payment Failed!';
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.message = 'Internal Server Error';
      }
    );
  }
}
