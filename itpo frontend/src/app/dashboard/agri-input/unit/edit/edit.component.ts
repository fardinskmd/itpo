import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseHttpService } from 'src/app/shared/services/purchase-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
id:any
  unit:FormGroup
  submitted:boolean=false
  unitData:any
    constructor(
      private fb:FormBuilder,
      private router:Router,
      private purchaseHttpService:PurchaseHttpService,
      private activedRoute:ActivatedRoute
    ) {
      this.unit=this.fb.group({
        unitCode:['',Validators.required],
        unitName:['',Validators.required],
          })
      this.id=this.activedRoute.snapshot.paramMap.get('id')

      this.purchaseHttpService.getUnitByID(this.id).subscribe((data:any)=>{
this.unitData=data.data
this.unit.get('unitCode')?.setValue(this.unitData.unitCode)
this.unit.get('unitName')?.setValue(this.unitData.unitName)
this.unit.updateValueAndValidity()
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
    this.purchaseHttpService.updateUnit(this.id,this.unit.value).subscribe((data=>{
    Swal.fire('Unit Updated Successfuly','','success')
    this.router.navigate(['dashboard/purchase/unit/list'])
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
