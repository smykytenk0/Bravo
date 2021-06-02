import { createAction, props } from '@ngrx/store';
import { ICustomerData } from '../interfaces/customers.interfacers';

const addNewCustomer = createAction('[Customers] Add New Customer', props<{customer: ICustomerData}>());

export const CustomersActions = {
  addNewCustomer
};
