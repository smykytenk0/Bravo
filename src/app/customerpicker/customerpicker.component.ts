import {Component, ElementRef, Input, ViewChild} from '@angular/core';
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
  filteredCustomers: Observable<string[]>;
  customers: string[];

  //TODO: `do the data filter for selectCustomers and styles for this select`
  @ViewChild('customerInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredCustomers = this.customerCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allCustomers.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.customers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.customerCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.customers.indexOf(fruit);

    if (index >= 0) {
      this.customers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.customers.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.customerCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCustomers.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}


