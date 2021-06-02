import { ICustomers } from '../interfaces/customers.interfacers';
import { createFeatureSelector, createReducer, createSelector } from '@ngrx/store';

export const initialState: ICustomers = {
  customers: [
    {
      customerNo: 'BB-123',
      name: 'Sandwich Bar',
      address: 'Shevchenko Street 123123',
      deliveryDays: ['Mon', 'Fri'],
    },
    {
      customerNo: 'BB-456',
      name: 'Burger Bar',
      address: 'Main Street, 1234 Zurich',
      deliveryDays: ['Tue', 'Wed'],
    }
  ]
};

export const CustomersReducer = createReducer(
  initialState,
);

export const defaultCustomersSelector = createFeatureSelector<ICustomers>('customersReducer');
export const customersSelector = createSelector(defaultCustomersSelector, state=>state.customers);
