import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PurchaseHttpService } from 'src/app/shared/services/purchase-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  getData: any;
  title = 'datatables';
  dtTrigger:any = new Subject<any>();
  dtOptions: any = {};
  constructor(private purchaseHttp:PurchaseHttpService,
    private router:Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ]
    };
    this.purchaseHttp.getUnit().subscribe((data: any) => {
      console.log(data);
      this.getData = data.data;
      this.dtTrigger.next();
    });
  }

  addUnit(){
this.router.navigate(['dashboard/purchase/unit/add'])
  }
  edit(id:any){
    this.router.navigate([`dashboard/purchase/unit/edit/${id}`])
  }
  delete(id:any){
Swal.fire({
  title:'Do you want to delete  Unit',
  showDenyButton:true,
  confirmButtonText:'Delete',
  denyButtonText:'Cancel'
}).then((result)=>{
  if(result.isConfirmed){
    this.purchaseHttp.deleteUnit(id).subscribe((data:any)=>{
      Swal.fire('Unit Deleted Successfuly','','success')
      location.reload()
    })

  }
})
  }

}
