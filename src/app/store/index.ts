import { ActionReducerMap} from '@ngrx/store';
import {IOrders} from "./interfaces/orders.interfaces";
import {OrdersReducer} from "./orders/orders.reducer";
import { ICustomers } from './interfaces/customers.interfacers';
import { CustomersReducer } from './customers/customers.reducer';

export interface State {
  defaultOrders: IOrders,
  defaultCustomers: ICustomers,
}

export const reducers: ActionReducerMap<State> = {
  defaultOrders: OrdersReducer,
  defaultCustomers: CustomersReducer
};

