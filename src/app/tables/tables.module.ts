import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { CustomersComponent } from './customers/customers.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PrintComponent } from '../print/print.component';
import { CommonModule } from '@angular/common';
import { dateFormatPipe } from '../shared/pipes/date.pipe';

export const routes: Routes = [
  { path: 'orders', component: OrdersTableComponent, children: [{ path: 'print', component: PrintComponent }] },
  { path: 'customers', component: CustomersComponent },
  { path: 'catalog', component: CatalogComponent }
];

@NgModule({
    declarations: [
        OrdersTableComponent,
        CustomersComponent,
        CatalogComponent,
        dateFormatPipe,
    ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
  ]
})

export class TablesModule {

}
