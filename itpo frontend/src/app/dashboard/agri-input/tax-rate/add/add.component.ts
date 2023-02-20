import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { event } from 'jquery';
import { HttpService } from 'src/app/shared/services/http.service';
import { PurchaseHttpService } from 'src/app/shared/services/purchase-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  taxRate:FormGroup
  submitted:boolean=false
  productCategory:any
  languages: any;
    constructor(
      private fb:FormBuilder,
      private router:Router,
      private httpService:HttpService,
      private purchaseHttpService:PurchaseHttpService
    ) {

      this.httpService.getLanguage().subscribe((data:any)=>{
        this.languages=data.languageData
      })

      this.purchaseHttpService.getProductCategory().subscribe((data:any)=>{
this.productCategory=data
      })

  this.taxRate=this.fb.group({
    taxName:['',Validators.required],
    taxCode:['',Validators.required],
    taxRate:['',Validators.required],
    language:['',Validators.required],
    taxType:['']
      })
     }

    ngOnInit(): void {
    }

    checkCode(event:any){
      this.purchaseHttpService.checkTaxCode(event.target.value).subscribe(data=>{

      },err=>{
        this.taxRate.get('taxCode')?.setErrors({isExist:true})
      })
    }

    onSubmit(){
  if(this.taxRate.valid){
    this.purchaseHttpService.addTaxRate(this.taxRate.value).subscribe((data=>{
    Swal.fire('Tax Rate Add Successfuly','','success')
    this.router.navigate(['dashboard/purchase/taxRate/list'])
    }),err=>{
      Swal.fire("Something went wrong",'','error')
    })
  }else{
    this.submitted=true
    Swal.fire('Please fill required field','','error')
  }
    }
    onSubmitNew(){
      if(this.taxRate.valid){
        this.purchaseHttpService.addTaxRate(this.taxRate.value).subscribe((data=>{
        Swal.fire('Tax Rate Add Successfuly','','success')
        this.taxRate.reset()
        // this.router.navigate(['dashboard/purchase/productCategory/list'])
        }),err=>{
          Swal.fire("Something went wrong",'','error')
        })
      }else{
        this.submitted=true
        Swal.fire('Please fill required field','','error')
      }
    }


    cancel(){
      this.router.navigate(['dashboard/purchase/taxRate/list'])
    }

  }
