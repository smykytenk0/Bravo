import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { emailSelector, roleSelector } from '../../../store/auth/auth.reducer';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from, Observable, of } from 'rxjs';
import { concat, map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';

interface AnyObj {
  [key: string]: any
}

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

  addItemInForm(num) {
    this.itemsForm.addControl(`item${ num }productCode`, new FormControl());
    this.itemsForm.addControl(`item${ num }quantity`, new FormControl())
  }

  deleteItemFromForm(num) {
    this.itemsForm.removeControl(`item${ num }productCode`);
    this.itemsForm.removeControl(`item${ num }quantity`)
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
      item1quantity: new FormControl()
    });
    this.store.select(roleSelector).subscribe(data => this.role = data);
    this.initOrderForm();
    this.store.select(emailSelector).subscribe(data => this.email = data);
    this.httpService.getCustomers({ email: this.email }).subscribe(data => this.customerData = data);
  }

  incrementCounter() {
    this.addItemInForm(this.counter);
    this.counterArr.push(this.counter);
    this.counter++;
  }

  getProductByProductCode(index: any) {
    console.log(this.itemsForm.value[`item${ index }quantity`]);
    return this.httpService.getCatalog({ productCode: this.itemsForm.value[`item${ index }productCode`] }).pipe(map(item => Object.assign(item[0], {quantity: this.itemsForm.value[`item${ index }quantity`]})))
  }

  addOrder() {
    this.counterArr.unshift(1);
    from(this.counterArr)
      .pipe(
        mergeMap(item => this.getProductByProductCode(item))
      )
      .subscribe(data => {
        console.log(data);
        this.items.push(data);
      });
    const order = Object.assign(this.orderForm.value, {
      customerData: this.customerData[0],
      items: this.items,
      role: 'customer',
      ordered: new Date(),
      isConfirmedStatus: false
    });
    setTimeout(() => {
        this.httpService.addOrder(order).subscribe();
      }, 1000
    )
  }

  deleteItem() {
    this.deleteItemFromForm(this.counter);
    this.counterArr.pop();
    this.counter--;
  }
}
