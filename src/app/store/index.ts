import { ActionReducerMap} from '@ngrx/store';
import {IOrders} from "./interfaces/orders.interfaces";
import {OrdersReducer} from "./orders/orders.reducer";
import { ICustomers } from './interfaces/customers.interfacers';
import { CustomersReducer } from './customers/customers.reducer';
import { Catalog } from './interfaces/catalog.interfaces';
import { CatalogReducer } from './catalog/catalog.reducer';

export interface State {
  defaultOrders: IOrders,
  defaultCustomers: ICustomers,
  defaultCatalog: Catalog
}

export const reducers: ActionReducerMap<State> = {
  defaultOrders: OrdersReducer,
  defaultCustomers: CustomersReducer,
  defaultCatalog: CatalogReducer
};

