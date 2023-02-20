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
  brand:FormGroup
  id:any
  submitted:boolean=false
  brandData:any
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

      this.brand=this.fb.group({
        brandCode:['',Validators.required],
        brandName:['',Validators.required],
        language:['',Validators.required],
        brandDescription:[''],
          })
      this.id=this.activedRoute.snapshot.paramMap.get('id')
      this.purchaseHttpService.getBrandByID(this.id).subscribe((data:any)=>{
this.brandData=data.data
this.brand.get('brandName')?.setValue(this.brandData?.brandName)
this.brand.get('brandCode')?.setValue(this.brandData?.brandCode)
this.brand.get('brandDescription')?.setValue(this.brandData?.brandDescription)
this.brand.get('language')?.setValue(this.brandData?.language)
      })

     }

    ngOnInit(): void {
    }

    checkCode(event:any){
      this.purchaseHttpService.checkBrandCode(event.target.value).subscribe(data=>{

      },err=>{
        this.brand.get('brandCode')?.setErrors({isExist:true})
      })
    }

    onSubmit(){
  if(this.brand.valid){
    this.purchaseHttpService.updateBrand(this.id,this.brand.value).subscribe((data=>{
    Swal.fire('Brand Update Successfuly','','success')
    this.router.navigate(['dashboard/purchase/brand/list'])
    }),err=>{
      Swal.fire("Something went wrong",'','error')
    })
  }else{
    this.submitted=true
    Swal.fire('Please fill required field','','error')
  }
    }



    cancel(){
      this.router.navigate(['dashboard/purchase/brand/list'])
    }

  }
