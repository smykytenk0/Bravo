import { ICustomers } from '../interfaces/customers.interfacers';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { CustomersActions } from './customers.actions';

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
    return { ...state, customers: [...state.customers.filter(customerObj => customerObj.name != customer.name), customer] }
  })
);

export const defaultCustomersSelector = createFeatureSelector<ICustomers>('customersReducer');
export const customersSelector = createSelector(defaultCustomersSelector, state=>state.customers);
