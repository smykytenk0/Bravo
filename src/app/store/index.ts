import { ActionReducerMap} from '@ngrx/store';
import {IOrders} from "./interfaces/orders.interfaces";
import {OrdersReducer} from "./orders.reducer";

export interface State {
  defaultOrders: IOrders
}

export const reducers: ActionReducerMap<State> = {
  defaultOrders: OrdersReducer
};

