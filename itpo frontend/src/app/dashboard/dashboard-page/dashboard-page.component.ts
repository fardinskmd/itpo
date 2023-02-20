import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  getValue: any;
  getValues: any;
  getValuess: any;
  getValuesss: any;
date:any= new Date()
  new: any;
  totalamount: any;

  constructor(private httpService:HttpService) {
  setInterval(() => {
    this.date= new Date()
    this.date = formatDate(new   Date(), 'dd/MM/yyyy', 'en');
    }, 5000);
}
  

  ngOnInit(): void {


    
    this.httpService.gettotalticket().subscribe((data: any) => {
      console.log(data);
      this.getValue = data?.Data;

    });

    this.httpService.gettotalscanneduser().subscribe((data: any) => {
   
      this.getValues = data?.Data;
     

    });
    this.httpService.getbuissnesdaycount().subscribe((data: any) => {
     
      this.getValuesss = data?.Data;

    });

    this.httpService.getnonbuissnesdaycount().subscribe((data: any) => {
   
      this.new = data?.Data;

    });

    this.httpService.gettotalpayment().subscribe((data: any) => {
   
      this.totalamount = data?.Data[0]?.Price;

    });

 


  }

}
