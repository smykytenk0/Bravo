import {createAction, props} from "@ngrx/store";

const addCustomersSelectFilteredData = createAction('[Orders] addCustomersSelectFilteredData', props<{ customer: string}>());
const removeCustomerFromSelect = createAction('[Orders] removeCustomerFromSelect', props<{customer: string}>());

export const OrdersActions ={
  addCustomersSelectFilteredData,
  removeCustomerFromSelect
};
