import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { HttpService } from '../../services/http.service';
import { emailSelector, roleSelector } from '../../../store/auth/auth.reducer';

@Component({
  selector: 'app-add-order-modal-window',
  templateUrl: './add-order-modal-window.component.html',
  styleUrls: ['./add-order-modal-window.component.scss']
})
export class AddOrderModalWindowComponent implements OnInit {
  role: string;
  orderForm: FormGroup;
  itemsForm: FormGroup;
  counterArr = [];
  counter: number = 2;
  email: string;
  customerData: any;
  uniqueProducts: string[] = [];
  items: any = [];
  unitsForEachItem: any = [];
  unitPrices: number[] = [0];
  activeUnit: any = [];

  addItemInForm(num) {
    this.itemsForm.addControl(`item${ num }productCode`, new FormControl());
    this.itemsForm.addControl(`item${ num }quantity`, new FormControl());
    this.itemsForm.addControl(`item${ num }unit`, new FormControl({ value: '', disabled: true }));
  }

  deleteItemFromForm(num) {
    this.itemsForm.removeControl(`item${ num }productCode`);
    this.itemsForm.removeControl(`item${ num }quantity`);
    this.itemsForm.removeControl(`item${ num }unit`);
  }

  initOrderForm() {
    this.orderForm = new FormGroup({
      notes: new FormControl(),
      reqDelivery: new FormControl()
    });
  }

  constructor(private store: Store,
              private httpService: HttpService,
              @Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit(): void {
    this.uniqueProducts = this.data;
    this.itemsForm = new FormGroup({
      item1productCode: new FormControl(),
      item1quantity: new FormControl(),
      item1unit: new FormControl({ value: '', disabled: true }),
    });
    this.store.select(roleSelector).subscribe(data => this.role = data);
    this.initOrderForm();
    this.store.select(emailSelector).subscribe(data => this.email = data);
    this.httpService.getCustomers({ email: this.email }).subscribe(data => this.customerData = data);
  }

  incrementCounter() {
    this.unitPrices.push(0);
    this.addItemInForm(this.counter);
    this.counterArr.push(this.counter);
    this.counter++;
  }

  getProductByProductCode(index: any) {
    return this.httpService.getCatalog({ productCode: this.itemsForm.value[`item${ index }productCode`] }).pipe(map(item => {
      return Object.assign(item[0], {
        quantity: this.itemsForm.value[`item${ index }quantity`],
        activeUnit: this.activeUnit[index - 1]
      })
    }))
  }

  addOrder() {
    this.counterArr.unshift(1);
    from(this.counterArr)
      .pipe(
        mergeMap(item => this.getProductByProductCode(item))
      )
      .subscribe(data => {
        this.items.push(data);
      });
    const order = Object.assign(this.orderForm.value, {
      customerData: this.customerData[0],
      items: this.items,
      role: 'customer',
      ordered: new Date(),
      status: 'new'
    });
    setTimeout(() => {
        this.httpService.addOrder(order).subscribe();
      }, 1000
    );
  }

  deleteItem() {
    this.deleteItemFromForm(this.counter);
    this.counterArr.pop();
    this.counter--;
  }

  getUnits(option, index = 0) {
    this.itemsForm.controls[`item${ index + 1 }unit`].enable();
    this.httpService.getCatalog({ productCode: option }).subscribe(data => this.unitsForEachItem[index] = data[0].units)
  }

  changePrice(index = 0) {
    this.activeUnit[index] = this.unitsForEachItem[index].filter(item => item.unit == this.itemsForm.value[`item${ index + 1 }unit`])[0];
    this.unitPrices[index] = this.activeUnit[index].price;
  }
}
