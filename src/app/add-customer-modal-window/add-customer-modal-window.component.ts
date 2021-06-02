import { Component, OnInit } from '@angular/core';
import { DAYS_SHORT } from '../shared/constants';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomersActions } from '../store/customers/customers.actions';

@Component({
  selector: 'app-add-customer-modal-window',
  templateUrl: './add-customer-modal-window.component.html',
  styleUrls: ['./add-customer-modal-window.component.scss']
})
export class AddCustomerModalWindowComponent implements OnInit{
  shortDays: string[] = DAYS_SHORT;
  customerForm: FormGroup;
  deliveryDaysForm: FormGroup;
  deliveryDays: string[] = [];

  ngOnInit(): void {
    const group = this.shortDays.reduce((previous, current)=>{
      return {...previous, [current]: new FormControl()}
    }, {});
    this.customerForm = new FormGroup({
      customerNo: new FormControl(),
      name: new FormControl(),
    });
    this.deliveryDaysForm = new FormGroup(group);
  }

  constructor( private store: Store ) { }

  addNewCustomer() {
    for (let day of this.shortDays){
      if(this.deliveryDaysForm.value[day]){
        this.deliveryDays.push(day);
      }
    }

    this.store.dispatch(CustomersActions.addNewCustomer({customer:
        {
          customerNo: this.customerForm.value.customerNo,
          name: this.customerForm.value.name,
          address: "Address here...",
          deliveryDays: this.deliveryDays
        }
    }))
  }
}
