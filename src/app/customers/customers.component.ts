import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerData, ICustomers } from '../store/interfaces/customers.interfacers';
import { select, Store } from '@ngrx/store';
import { customersSelector } from '../store/customers/customers.reducer';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerModalWindowComponent } from '../add-customer-modal-window/add-customer-modal-window.component';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  title: string = 'Customers';
  placeholder: string = "Customer No, Name, Address...";
  addCustomer: string = "Add Customer";
  customers$: Observable<ICustomerData[]>;
  displayedColumns: string[] = ['customerNo', 'name', 'address', 'deliveryDays'];

  constructor(private store: Store, private dialog: MatDialog) {
    this.customers$ = this.store.pipe(select(customersSelector))
  }

  OpenCustomersTableTr(row) {
    this.dialog.open(AddCustomerModalWindowComponent, {
      data: row
    })
  }
}

