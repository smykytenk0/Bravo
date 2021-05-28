import {createAction, props} from "@ngrx/store";

const addCustomersSelectFilteredData = createAction('[Orders] addCustomersSelectFilteredData', props<{ customer: string}>());
const removeCustomerFromSelect = createAction('[Orders] removeCustomerFromSelect', props<{index: number}>());

export const OrdersActions ={
  addCustomersSelectFilteredData,
  removeCustomerFromSelect
};
