import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-thanku',
  templateUrl: './thanku.component.html',
  styleUrls: ['./thanku.component.css']
})
export class ThankuComponent implements OnInit {

  id: any;
  EditData: any;
  urnno:any

  constructor(private httpService:HttpService,private _Activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.httpService
    .getdetailbyurnnombers(this.id)
    .subscribe((data: any) => {
      console.log(data,"farmer data by id");
      this.EditData=data.resultData;
    })
  }

}
