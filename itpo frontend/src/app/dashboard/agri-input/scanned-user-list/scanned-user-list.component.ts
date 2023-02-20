import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scanned-user-list',
  templateUrl: './scanned-user-list.component.html',
  styleUrls: ['./scanned-user-list.component.css']
})
export class ScannedUserListComponent implements OnInit {

  kisanmitra!:FormGroup;
  submitted=false
  isEdit= false
  isAdd=false
  languageData:any
  id: any;

  title = 'datatables';
  dtTrigger:any = new Subject<any>();
  dtOptions:  DataTables.Settings = {};
 
  constructor( private fb:FormBuilder,
    private httpService:HttpService,
    private router: Router,
) {

  this.httpService.gettotalscaneeduserdata().subscribe((data:any)=>{
    this.languageData=data?.Data
   
  })
      this.kisanmitra=this.fb.group({
        urnno:[''],
        date:[''],
        userid:[''],
        updatedAt:[''],
    
      })
    }


    
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true,
      dom: 'Blfrtip',
     
    };
    

  }
  onUpdate() {console.log(this.kisanmitra);
    if(this.kisanmitra.valid){
      this.httpService.updateLanguage(this.id,this.kisanmitra.value,
      ).subscribe((data: any) => {
        this.kisanmitra.reset()
    Swal.fire('language Updated Successfully!', '', 'success')
    window.location.reload()
        window.location.reload()
      }, (err: { error: string | undefined; }) => {
        console.log(err.error);

        Swal.fire(err.error, '', 'error')
      })
    }
    else{
      this.submitted = true;  // this.toast.showSuccess('State Successfully Added')
    }


      }

  onSubmit() {console.log(this.kisanmitra);
if(this.kisanmitra.valid){
  this.httpService.addKissanMitra(this.kisanmitra.value).subscribe((data: any) => {
console.log(this.kisanmitra.value)
    this.kisanmitra.reset()
    Swal.fire('Kisanmitra Added Successfully!', '', 'success')
    window.location.reload()
  }, (err: { error: string | undefined; }) => {
    Swal.fire(err.error, '', 'error')

  })
}
else{
  this.submitted = true;  // this.toast.showSuccess('State Successfully Added')
}


  }

  // addState(){
  //   this.router.navigate(['/dashboard/masters/state'])
  // }
  edit(languageData:any){
    this.id=languageData._id
    this.isEdit= true
    this.isAdd=true
    // this.language.get('language')?.setValue(languageData.language)
    // this.language.get('language')?.updateValueAndValidity()
    // let url: string = "/dashboard/masters/stateEdit/" + id
    // this.router.navigateByUrl(url);
  }


  delete=(id:any)=>{
    Swal.fire({
         title: 'Do you want to delete kisanmitra?',
         showDenyButton: true,
         // showCancelButton: true,
         confirmButtonText: 'Delete',
         denyButtonText: `Cancel`,
       }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
           this.httpService.deleteKissanMitra(id).subscribe((Data: any)=>{
             Swal.fire('kisanmitra Deleted Successfully!', '', 'success')
             location.reload();
           },(err: any)=>{
             location.reload();
             Swal.fire('Something went wrong!', '', 'error')
           })

         } else if (result.isDenied) {
           // Swal.fire('Changes are not saved', '', 'info')
         }
       })
 }
  cancel(){
    this.isAdd=false
  }
  addLanguage(){
    this.isAdd=true
    this.isEdit=false
    this.kisanmitra.reset()
  }

  checklanguage(event:any){
    console.log(event.target.value)
    this.httpService.checkLanguage(event.target.value).subscribe((data: any)=>{

    },()=>{
      this.kisanmitra.get('language')?.setErrors({isExist:true})
      // this.schemeForm.get('schemeCode')?.updateValueAndValidity()
      console.log( this.kisanmitra.get('language')?.valid)
    })

  }


}
