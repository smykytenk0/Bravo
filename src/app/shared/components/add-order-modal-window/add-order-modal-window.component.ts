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

  initItems(){
    const itemsControl = this.counterArr.reduce((previous, current) => {
      return {...previous,
      [`item-${current}`]: new FormControl()
      }
    });
    this.itemsForm = new FormGroup(itemsControl);
    for(let i of this.counterArr){
      console.log(`Item-${i}`);
    }
  }

  initOrderForm(){
    this.orderForm = new FormGroup({
      notes: new FormControl(),
      reqDelivery: new FormControl()
    });
  }

  constructor(private store: Store, private httpService: HttpService) {
  }


  ngOnInit(): void {
    this.store.select(roleSelector).subscribe(data => this.role = data);
    this.initOrderForm();
  }

  incrementCounter() {
    this.counterArr.push(this.counter);
    this.counter++;
    this.initItems();
  }

  addOrder() {
    const order = {
      customerId: 2,
      items: [
        {
          productId: 1,
          quantity: 10
        },
        {
          productId: 2,
          quantity: 10
        }
      ],
      notes: this.orderForm.value.notes,
      ordered: new Date(),
      reqDelivery: this.orderForm.value.reqDelivery,
      isConfirmedStatus: false,
    };
    this.httpService.addOrder(order).subscribe();
  }

  deleteItem() {
    this.counterArr.pop();
    this.counter--;
  }
}
