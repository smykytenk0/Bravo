import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { OrdersData } from '../../store/interfaces/orders.interfaces';
import { OrdersActions } from '../../store/orders/orders.actions';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  filteredCustomers: string[];
  filteredOrdersData: OrdersData[];

  constructor(private store: Store, private httpService: HttpService) {
  }



  ordersFilter() {
    this.store.dispatch(OrdersActions.applyCustomerFilter());
    //this.getOrdersData();
    //this.store.pipe(select(rangeStartDateSelector)).subscribe(data => this.rangeStartDate = data);
    //this.store.pipe(select(rangeEndDateSelector)).subscribe( data => this.rangeEndDate = data);
    //this.store.pipe(select(filteredCustomersSelector)).subscribe( data => this.filteredCustomers = data);
    //if(this.filteredCustomers.length != 0){
    //  return this.store.dispatch(OrdersActions.filterCustomerSelect({customers: this.filteredOrdersData.filter(data => this.filteredCustomers.indexOf(data.customer)!=-1 && data.ordered > this.rangeStartDate && data.ordered < this.rangeEndDate)}))
    //}
    //  return this.store.dispatch(OrdersActions.filterCustomerSelect({customers: this.filteredOrdersData.filter(data => data.ordered > this.rangeStartDate && data.ordered < this.rangeEndDate)}))
  }
}
