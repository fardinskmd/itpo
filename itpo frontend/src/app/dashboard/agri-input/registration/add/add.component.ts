import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 urnno:any
  id:any
  data:any
  constructor(private activedRoute:ActivatedRoute,
    private httpClient:HttpClient,) {
    this.id= this.activedRoute.snapshot.paramMap.get('id')
    this.httpClient.get(`${environment.serverUrl}//badge/getbadgedataBySMBID/${this.id}`).subscribe((data:any)=>{
      this.data=data?.resultData[0]
      this.httpClient.get(`${environment.serverUrl}//badge/getbadgedata/${data?.resultData[0]._id}`).subscribe((data:any)=>{
        // this.data=data?.resultData[0]
      })
    })
   }

  ngOnInit(): void {
  }


}
