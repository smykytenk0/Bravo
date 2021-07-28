import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { CustomersActions } from './customers.actions';
import { ICustomers } from '../interfaces/customers.interfacers';

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
  on(CustomersActions.addNewCustomer, (state, {customer}) =>{
    return { ...state, customers: [...state.customers, customer]}
  }),
  on(CustomersActions.editCustomer, (state, {customer}) => {
    const index = state.customers.indexOf(state.customers.find(data => data.name == customer.name));
    const newCustomersArray = [...state.customers];
    newCustomersArray[index] = customer;
    return { ...state, customers: newCustomersArray }
  })
);

export const defaultCustomersSelector = createFeatureSelector<ICustomers>('customersReducer');
export const customersSelector = createSelector(defaultCustomersSelector, state=>state.customers);
