import { createAction, props } from '@ngrx/store';

import { OrdersData } from '../interfaces/orders.interfaces';

const addCustomersSelectFilteredData = createAction('[Orders] addCustomersSelectFilteredData', props<{ customer: string }>());
const removeCustomerFromSelect = createAction('[Orders] removeCustomerFromSelect', props<{ customer: string }>());
const filterCustomerSelect = createAction('[Orders] filterCustomerSelect', props<{ customers: OrdersData[] }>());
const applyCustomerFilter = createAction('[Orders] apply Customer Filter');
const toggleDatepicker = createAction('[Orders] toggle Datepicker');
const getRangeStartDate = createAction('[Orders] getRangeStartDate', props<{ startDate: Date }>());
const getRangeEndDate = createAction('[Orders] getRangeEndDate', props<{ endDate: Date }>());
const changeStatus = createAction('[Orders] Change Status', props<{ order: OrdersData }>());
const filterStatus = createAction('[Orders] Filter Status', props<{ status: string }>());
const clearAllFilters = createAction('[Orders] Clear Filter Customers', props);

export const OrdersActions = {
  applyCustomerFilter,
  addCustomersSelectFilteredData,
  removeCustomerFromSelect,
  filterCustomerSelect,
  getRangeStartDate,
  getRangeEndDate,
  toggleDatepicker,
  changeStatus,
  filterStatus,
  clearAllFilters
};
