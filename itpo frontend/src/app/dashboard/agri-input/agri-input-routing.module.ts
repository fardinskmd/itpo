import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketBookingListComponent } from './ticket-booking-list/ticket-booking-list.component';
import { ScannedUserListComponent } from './scanned-user-list/scanned-user-list.component';

const routes: Routes = [



  {
    path:'taxRate',
    loadChildren:()=>import('../agri-input/tax-rate/tax-rate.module').then(m=>m.TaxRateModule)
  },
  {
    path:'brand',
    loadChildren:()=>import('../agri-input/qruser/brand.module').then(m=>m.BrandModule)
  },
 
  {
    path:'registartion',
    loadChildren:()=>import('../agri-input/registration/registration.module').then(m=>m.RegistrationModule)
  },




  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriInputRoutingModule { }
