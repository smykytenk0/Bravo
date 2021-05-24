import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-customerpicker',
  templateUrl: './customerpicker.component.html',
  styleUrls: ['./customerpicker.component.scss']
})
export class CustomerpickerComponent  {
  @Input() allCustomers: string[];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  customerCtrl = new FormControl();
  filteredCustomers$: Observable<string[]>;
  customers: string[] = [];

  @ViewChild('customerInput') customerInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredCustomers$ = this.customerCtrl.valueChanges.pipe(
      startWith(null),
      map((customers: string | null) => customers ? this._filter(customers) : this.allCustomers.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.customers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.customerCtrl.setValue(null);
  }

  remove(customer: string): void {
    const index = this.customers.indexOf(customer);

    if (index >= 0) {
      this.customers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.customers.push(event.option.viewValue);
    this.customerInput.nativeElement.value = '';
    this.customerCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCustomers.filter(customers => customers.toLowerCase().indexOf(filterValue) === 0);
  }
}


