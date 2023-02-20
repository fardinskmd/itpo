import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  id: any;
  EditData: any;
  urnno:any

  constructor(private httpService:HttpService,private _Activatedroute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.httpService
    .getdetailbyurnnombers(this.id)
    .subscribe((data: any) => {
      console.log(data,"farmer data by id");
      this.EditData=data.resultData;
    })
  }
}
