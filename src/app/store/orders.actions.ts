import {createAction, props} from "@ngrx/store";
import {OrdersData} from "./interfaces/interfaces";

const addCustomersSelectFilteredData = createAction('[Orders] addCustomersSelectFilteredData', props<{ customer: string}>());
const removeCustomerFromSelect = createAction('[Orders] removeCustomerFromSelect', props<{customer: string}>());
const filterCustomerSelect = createAction( '[Orders] filterCustomerSelect', props<{customers: OrdersData[]}>());

export const OrdersActions ={
  addCustomersSelectFilteredData,
  removeCustomerFromSelect,
  filterCustomerSelect
};
