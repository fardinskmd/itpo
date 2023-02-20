import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgriInputRoutingModule } from './agri-input-routing.module';

import { DataTablesModule } from 'angular-datatables';
import { NgxPrintModule } from 'ngx-print';
import { TicketBookingListComponent } from './ticket-booking-list/ticket-booking-list.component';
import { ScannedUserListComponent } from './scanned-user-list/scanned-user-list.component';





@NgModule({
  declarations: [

  
   
  
   
  
    TicketBookingListComponent,
                           ScannedUserListComponent
  ],
  imports: [
    CommonModule,
    AgriInputRoutingModule,
    DataTablesModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class AgriInputModule { }
