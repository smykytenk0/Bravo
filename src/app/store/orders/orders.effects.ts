import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';

import { IOrders } from '../interfaces/orders.interfaces';
import { OrdersActions } from './orders.actions';

import {
  filteredCustomersSelector,
  ordersDataSelector,
  rangeEndDateSelector,
  rangeStartDateSelector
} from './orders.reducer';

@Injectable()
export class OrdersEffect {

  filterEffect$ = createEffect(() =>
    this.actions.pipe(
      ofType(OrdersActions.applyCustomerFilter),
      withLatestFrom(
        this.store.pipe(select(rangeStartDateSelector)),
        this.store.pipe(select(rangeEndDateSelector)),
        this.store.pipe(select(filteredCustomersSelector)),
        this.store.pipe(select(ordersDataSelector)),
      ),
      map(([, start, end, filter, customers]) => ({
        start,
        end,
        filter,
        customers: customers.filter(customer => customer.ordered > start && customer.ordered < end)
      })),
      map(({ start, end, filter, customers }) =>
        OrdersActions.filterCustomerSelect(
          { customers:  !!filter.length ?
              customers.filter(data => !!filter.find(name => name === data.customer))
              : customers })),
    ));

  constructor(private actions: Actions, private store: Store<IOrders>) {
  }
}
