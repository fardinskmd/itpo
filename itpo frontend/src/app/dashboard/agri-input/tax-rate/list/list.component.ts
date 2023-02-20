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
    this.purchaseHttp.getTaxRate().subscribe((data: any) => {
      console.log(data);
      this.getData = data;
      this.dtTrigger.next();
    });
  }

  addTax(){
this.router.navigate(['dashboard/purchase/taxRate/add'])
  }
  edit(id:any){
    this.router.navigate([`dashboard/purchase/taxRate/edit/${id}`])
  }
  delete(id:any){
Swal.fire({
  title:'Do you want to delete  Tax Rate',
  showDenyButton:true,
  confirmButtonText:'Delete',
  denyButtonText:'Cancel'
}).then((result)=>{
  if(result.isConfirmed){
    this.purchaseHttp.deleteTaxRate(id).subscribe((data:any)=>{
      Swal.fire('Tax Rate Deleted Successfuly','','success')
      location.reload()
    })

  }
})
  }

}
