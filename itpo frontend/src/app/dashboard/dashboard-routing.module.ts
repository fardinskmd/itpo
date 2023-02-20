import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannedUserListComponent } from './agri-input/scanned-user-list/scanned-user-list.component';
import { TicketBookingListComponent } from './agri-input/ticket-booking-list/ticket-booking-list.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [
  {path:'',component:DashboardPageComponent},
  { path: 'booking-list', component: TicketBookingListComponent },
  { path: 'scanned-list', component: ScannedUserListComponent },

{path:'purchase',
loadChildren:()=>import('../dashboard/agri-input/agri-input.module').then(m=>m.AgriInputModule)},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
