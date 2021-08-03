import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { filter, map, startWith } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { OrdersActions } from '../../../store/orders/orders.actions';
import { filteredCustomersSelector } from '../../../store/orders/orders.reducer';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-customerpicker',
  templateUrl: './customerpicker.component.html',
  styleUrls: ['./customerpicker.component.scss']
})
export class CustomerpickerComponent {
  @Input() allCustomers: string[];
  @Output() customers$: Observable<string[]>;
  @ViewChild('customerInput') customerInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Output() selectedCustomers: EventEmitter<string[]> = new EventEmitter();
  customersFiltered: string[] = [];
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  customerCtrl = new FormControl();
  filteredCustomers: Observable<string[]>;

  constructor(private store: Store, private orders: OrdersService) {
    this.customers$ = this.store.pipe(select(filteredCustomersSelector));
    this.filteredCustomers = this.customerCtrl.valueChanges.pipe(
      startWith(null),
      map((customers: string | null) => customers ? this._filter(customers) : this.allCustomers.slice()));
  }

  public addOption(event: MatChipInputEvent): void {
    if (event.value !== '') {
      this.customersFiltered.push(event.value);
    }
    const value = (event.value || '').trim();
    if (value) {
      this.store.dispatch(OrdersActions.addCustomersSelectFilteredData({ customer: value }));
    }
    event.chipInput!.clear();
    this.customerCtrl.setValue(null);
    this.orders.ordersFilter();
    this.selectedCustomers.emit(this.customersFiltered);
  }

  public removeOption(customer: string): void {
    const index = this.customersFiltered.indexOf(customer);
    this.customersFiltered = this.customersFiltered.slice(0, index).concat(this.customersFiltered.slice(index + 1));
    this.selectedCustomers.emit(this.customersFiltered);
    this.store.dispatch(OrdersActions.removeCustomerFromSelect({ customer: customer }));
    this.orders.ordersFilter();
  }

  public selectedOption(event: MatAutocompleteSelectedEvent): void {
    this.customersFiltered.push(event.option.viewValue);
    this.selectedCustomers.emit(this.customersFiltered);
    this.store.dispatch(OrdersActions.addCustomersSelectFilteredData({ customer: event.option.viewValue }));
    this.customerInput.nativeElement.value = '';
    this.customerCtrl.setValue(null);
    this.orders.ordersFilter();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCustomers.filter(customers => customers.toLowerCase().indexOf(filterValue) === 0);
  }
}


