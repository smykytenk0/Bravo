import {createAction, props} from "@ngrx/store";
import {OrdersData} from "./interfaces/interfaces";

const addCustomersSelectFilteredData = createAction('[Orders] addCustomersSelectFilteredData', props<{ customer: string}>());
const removeCustomerFromSelect = createAction('[Orders] removeCustomerFromSelect', props<{customer: string}>());
const filterCustomerSelect = createAction( '[Orders] filterCustomerSelect', props<{customers: OrdersData[]}>());
const getRangeStartDate = createAction( '[Orders] getRangeStartDate', props<{startDate: Date}>());
const getRangeEndDate = createAction( '[Orders] getRangeEndDate', props<{endDate: Date}>());

export const OrdersActions ={
  addCustomersSelectFilteredData,
  removeCustomerFromSelect,
  filterCustomerSelect,
  getRangeStartDate,
  getRangeEndDate
};
