import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-payment',
  templateUrl: './ticket-payment.component.html',
  styleUrls: ['./ticket-payment.component.css']
})
export class TicketPaymentComponent implements OnInit {
id:any
ticketData:any
cheksumData:any
parmasData:any
pendingAmount:any=0
  constructor(private activedRoute:ActivatedRoute,
    private httpservice:HttpService) {
    this.id=this.activedRoute.snapshot.paramMap.get('id')
    console.log(this.id)
    this.httpservice.getBadgeByMobile(this.id).subscribe((data:any)=>{
      this.ticketData=data?.resultData
      this.ticketData?.map((item:any)=>{
        this.pendingAmount=this.pendingAmount+Number(item?.price)
      })
      this.payNow()
    })

  }

  ngOnInit(): void {
  }
  payNow(){

    this.httpservice.payNow({price:this.pendingAmount,name:this.ticketData[0].name,email:this.ticketData[0].email,mobile:this.ticketData[0].mobile}).subscribe((data: any)=>{
this.cheksumData=data?.data
this.parmasData=data?.params
      // Swal.fire('Ticket Booked Succsefully Please Check Your Email and Phone','','success')
      // location.reload()
    },(err: any)=>{
      // Swal.fire('Something went Wrong','','error')
      console.log(err)

    })
  }

}
