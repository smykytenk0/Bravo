import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomerData, ICustomers } from '../store/interfaces/customers.interfacers';
import { select, Store } from '@ngrx/store';
import { customersSelector } from '../store/customers/customers.reducer';


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

  constructor(private store: Store) {
    this.customers$ = this.store.pipe(select(customersSelector))
  }
}
