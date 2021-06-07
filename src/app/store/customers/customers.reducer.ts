import { ICustomers } from '../interfaces/customers.interfacers';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { CustomersActions } from './customers.actions';

export const initialState: ICustomers = {
  customers: [

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
