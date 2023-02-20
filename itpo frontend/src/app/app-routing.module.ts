import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent,
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {path:'auth',
loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
{path:'dashboard',component:DashboardComponent,
loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
