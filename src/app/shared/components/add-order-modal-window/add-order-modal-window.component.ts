import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { roleSelector } from '../../../store/auth/auth.reducer';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';

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

  addItemInForm(num) {
    this.itemsForm.addControl(`item-${num}-productName`, new FormControl());
    this.itemsForm.addControl(`item-${num}-quantity`, new FormControl())
  }

  deleteItemInForm(num){
    this.itemsForm.removeControl(`item-${num}-productName`);
    this.itemsForm.removeControl(`item-${num}-quantity`)
  }

  initOrderForm() {
    this.orderForm = new FormGroup({
      notes: new FormControl(),
      reqDelivery: new FormControl()
    });
  }

  constructor(private store: Store, private httpService: HttpService) {
  }


  ngOnInit(): void {
    this.itemsForm = new FormGroup({});
    this.store.select(roleSelector).subscribe(data => this.role = data);
    this.initOrderForm();
  }

  incrementCounter() {
    this.addItemInForm(this.counter);
    this.counterArr.push(this.counter);
    this.counter++;
  }

  addOrder() {
    let items = [{
      productId: this.itemsForm.value[`item-1-productName`],
      quantity: this.itemsForm.value[`item-1-quantity`]
    }];
    for (let i of this.counterArr){
      const item = {
        productId: this.itemsForm.value[`item-${ i }-productName`],
        quantity: this.itemsForm.value[`item-${ i }-quantity`]
      };
      items.push(item)
    }
    const order = {
      customerId: 2,
      items: items,
      notes: this.orderForm.value.notes,
      ordered: new Date(),
      reqDelivery: this.orderForm.value.reqDelivery,
      isConfirmedStatus: false,
    };
    this.httpService.addOrder(order).subscribe();
  }

  deleteItem() {
    this.deleteItemInForm(this.counter);
    this.counterArr.pop();
    this.counter--;
  }
}
