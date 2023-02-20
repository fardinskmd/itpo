import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxRateRoutingModule } from './tax-rate-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TaxRateRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  
  ]
})
export class TaxRateModule { }
