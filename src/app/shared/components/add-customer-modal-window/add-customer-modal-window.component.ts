import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DAYS_SHORT } from '../../constants';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomersActions } from '../../../store/customers/customers.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomerData } from '../../../store/interfaces/customers.interfacers';
import { customersSelector } from '../../../store/customers/customers.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-customer-modal-window',
  templateUrl: './add-customer-modal-window.component.html',
  styleUrls: ['./add-customer-modal-window.component.scss']
})
export class AddCustomerModalWindowComponent implements OnInit, OnDestroy {
  shortDays: string[] = DAYS_SHORT;
  customerForm: FormGroup;
  deliveryDaysForm: FormGroup;
  deliveryDays: string[] = [];
  modalTitle: string = this.data ? 'Edit customer' : 'Add customer';
  modalAcceptButton: string = this.data? 'Save' : 'Add Customer' ;
  allCustomers: ICustomerData[];
  customersName = [];
  private unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) private data: ICustomerData) {
    this.store.select(customersSelector).pipe(takeUntil(this.unsubscribeAll)).subscribe(data => this.allCustomers = data);
    for(let i of this.allCustomers){
      this.customersName.push(i.name)
    }
  }

  private initDeliveryForm(){
    const daysControl = this.shortDays.reduce((previous, current) => {
      return {
        ...previous,
        [current]: new FormControl(this.data ? this.data.deliveryDays.indexOf(current) != -1 : null)
      }
    }, {});
    this.deliveryDaysForm = new FormGroup(daysControl);
  }

  private initCustomerForm(){
    this.customerForm = new FormGroup({
      customerNo: new FormControl(this.data ? this.data.customerNo : ''),
      name: new FormControl(this.data ? this.data.name : ''),
      deliveryAddress: new FormControl(this.data ? this.data.address : ''),
      contactName: new FormControl(),
      mobilePhone: new FormControl(),
      notify: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.initDeliveryForm();
    this.initCustomerForm();
  }


  addNewCustomer() {
    for (let day of this.shortDays) {
      if (this.deliveryDaysForm.value[day]) {
        this.deliveryDays.push(day);
      }
    }

    const customer = {
      customerNo: this.customerForm.value.customerNo,
      name: this.customerForm.value.name,
      address: this.customerForm.value.deliveryAddress,
      deliveryDays: this.deliveryDays
    };

    this.store.dispatch(this.data ? CustomersActions.editCustomer({
      customer}) : CustomersActions.addNewCustomer({customer}));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
