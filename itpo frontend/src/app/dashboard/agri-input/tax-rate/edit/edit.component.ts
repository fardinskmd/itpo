import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { PurchaseHttpService } from 'src/app/shared/services/purchase-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
id:any
  taxRate:FormGroup
  submitted:boolean=false
  productCategory:any
  taxData:any
  languages: any;
    constructor(
      private fb:FormBuilder,
      private router:Router,
      private httpService:HttpService,
      private purchaseHttpService:PurchaseHttpService,
      private activedRoute:ActivatedRoute
    ) {
      this.httpService.getLanguage().subscribe((data:any)=>{
        this.languages=data.languageData
      })


      this.taxRate=this.fb.group({
        taxName:['',Validators.required],
        taxCode:['',Validators.required],
        taxRate:['',Validators.required],
        language:['',Validators.required],
        taxType:['']

          })
     this.id= this.activedRoute.snapshot.paramMap.get('id')
     this.purchaseHttpService.getTaxRateById(this.id).subscribe((data:any)=>{
      this.taxData=data.gettaxbyid
      this.taxRate.get('taxName')?.setValue(this.taxData.taxName)
      this.taxRate.get('taxCode')?.setValue(this.taxData.taxCode)
      this.taxRate.get('taxRate')?.setValue(this.taxData.taxRate)
      this.taxRate.get('taxType')?.setValue(this.taxData.taxType)
      this.taxRate.get('language')?.setValue(this.taxData.language)
      this.taxRate.updateValueAndValidity()
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
    this.purchaseHttpService.updateTaxRate(this.id,this.taxRate.value).subscribe((data=>{
    Swal.fire('Tax Rate Updated Successfuly','','success')
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
