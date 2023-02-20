import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseHttpService } from 'src/app/shared/services/purchase-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  unit:FormGroup
  submitted:boolean=false
  productCategory:any
    constructor(
      private fb:FormBuilder,
      private router:Router,
      private purchaseHttpService:PurchaseHttpService
    ) {
      this.purchaseHttpService.getProductCategory().subscribe((data:any)=>{
this.productCategory=data
      })

  this.unit=this.fb.group({
    unitCode:['',Validators.required],
    unitName:['',Validators.required],
      })
     }

    ngOnInit(): void {
    }

    checkCode(event:any){
      this.purchaseHttpService.checkUnitCode(event.target.value).subscribe(data=>{

      },err=>{
        this.unit.get('unitCode')?.setErrors({isExist:true})
      })
    }

    onSubmit(){
  if(this.unit.valid){
    this.purchaseHttpService.addUnit(this.unit.value).subscribe((data=>{
    Swal.fire('unit Added Successfuly','','success')
    this.router.navigate(['dashboard/purchase/unit/list'])
    }),err=>{
      Swal.fire("Something went wrong",'','error')
    })
  }else{
    this.submitted=true
    Swal.fire('Please fill required field','','error')
  }
    }
    onSubmitNew(){
      if(this.unit.valid){
        this.purchaseHttpService.addUnit(this.unit.value).subscribe((data=>{
        Swal.fire('unit Added Successfuly','','success')
        this.unit.reset()
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
      this.router.navigate(['dashboard/purchase/unit/list'])
    }

  }
