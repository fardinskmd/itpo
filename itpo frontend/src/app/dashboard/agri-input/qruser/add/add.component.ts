import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { PurchaseHttpService } from 'src/app/shared/services/purchase-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  crops:any
  isAdd:boolean=false
  isEdit:boolean=false

  croptype:any
  cropsData:any
  submitted=false
  id:any
  languages:any
  language:any
  cropForm:FormGroup

  
  constructor(private httpservice:HttpService,
   private httpService:HttpService,
    private router:Router,
    private fb:FormBuilder) {
    // this.httpservice.getRegisterqruser().subscribe((data:any)=>{
    //   this.crops=data

    // })

 
    this.cropForm= this.fb.group({
      name : ['',Validators.required],
      email:['',Validators.required],
      mobile :['',Validators.required],
      password: ['',Validators.required]
     
      // cropid:{ type:String , trim:true  ,uppercase:true},

    })
  // this.httpservice.getCropType().subscribe((data:any)=>{
  //   this.cropType=data
  // })



  this.httpservice.getLanguage().subscribe((data:any)=>{
    this.languages=data.languageData
  })



   }

  ngOnInit(): void {
  }
  delete=(id:any)=>{
     Swal.fire({
          title: 'Do you want to delete Crop?',
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Cancel`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.httpservice.deleteCrop(id).subscribe(Data=>{
              Swal.fire('Crop Deleted Successfully!', '', 'success')
              location.reload();
            },err=>{
              location.reload();
              Swal.fire('Something went wrong!', '', 'error')
            })

          } else if (result.isDenied) {
            // Swal.fire('Changes are not saved', '', 'info')
          }
        })
  }
  edit=(data:any)=>{
this.id=data._id
this.isAdd=false
this.isEdit=true
this.cropForm.get('crop_name')?.setValue(data.crop_name)
this.cropForm.get('croptype')?.setValue(data.croptype._id)
this.cropForm.get('language')?.setValue(data.language)
this.httpService.getCropTypeByLanguage(data.language).subscribe((data:any)=>{
  this.croptype=data?.crops
})

// this.httpservice.getCropType().subscribe((data:any)=>{
//   this.croptype=data
// })




this.cropForm.get('crop_description')?.setValue(data.crop_description)

this.cropForm.get('image')?.setValue(data.image)
this.cropForm.updateValueAndValidity()
this.cropsData=data


// const url= '/dashboard/sell/master/crop/edit/'+id
// this.router.navigate([url])
  }

  getCrop(event:any){
  
    // this.village.get('city')?.reset()
    // this.village.get('city')?.updateValueAndValidity()
    this.httpService.getCropTypeByLanguage(event.target.value).subscribe((data:any)=>{
      this.croptype=data?.crops
      console.log(data)
     
            })
       
  }

  uploads($event: any) {
    let file = $event.target.files;
    let img = new Image()
  img.src = window.URL.createObjectURL(file[0])
  // img.width === 484 && img.height === 154
  img.onload = () => {
     if(true){
      if (parseInt(file[0].size) > 5090007152) {
    Swal.fire(
      'Error!',
      'file to large',
      'error'
    )
      }
      else {
        this.httpservice.upload(file[0]).subscribe((data: any) => {
            this.cropForm.get('image')?.setValue(data?.body)
            this.cropForm.updateValueAndValidity()
        })

      }

          } else {
            Swal.fire(
              'Error!',
              `Sorry, this image doesn't look like the size we wanted. It's
     ${img.width} x ${img.height} but we require 487 x 154 size image.`,
              'error'
            )
    //       alert(`Sorry, this image doesn't look like the size we wanted. It's
    //  ${img.width} x ${img.height} but we require 100 x 100 size image.`);
     }
  }


  }
      onSubmit(){
        if(this.cropForm.valid){

          this.httpservice.Registerqruser(this.cropForm.value).subscribe(data=>{
            Swal.fire('User Added Successfully!', '', 'success')
            this.router.navigate(['dashboard/purchase/brand/list'])
          },err=>{
            Swal.fire('Something went wrong!', '', 'error')
          })
        }
        else{
          Swal.fire('Please Fill Required Field!', '', 'error')
        }
      }

      update(){
        if(this.cropForm.valid){

          this.httpservice.updateCrop(this.id,this.cropForm.value).subscribe(data=>{
            Swal.fire('User Updated Successfully!', '', 'success')
            // this.router.navigate([`/dashboard/sell/master/crop`])
            location.reload()
          },err=>{
            Swal.fire('Something went wrong!', '', 'error')
          })
        }
        else{
          Swal.fire('Please Fill Required Field!', '', 'error')
        }
      }
   

  addCrop(){
   this.isAdd=true
   this.isEdit=false
   this.cropForm.reset()
  }

  cancel(){
    this.isAdd=false
   this.isEdit=false


}


  }
