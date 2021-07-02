import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { IOrders } from '../interfaces/orders.interfaces';
import { OrdersActions } from './orders.actions';

export const initialState: IOrders = {
  ordersData: [
    {
      orderNo: 1,
      customer: 'Sasha',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      ordered: new Date(2017, 7, 9, 22, 18),
      reqDelivery: new Date(2017, 7, 9, 22, 18),
      isConfirmedStatus: true,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Alex',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 },
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },],
      notes: 'Notes',
      ordered: new Date(2017, 7, 9, 22, 18),
      reqDelivery: new Date(2017, 7, 9, 22, 18),
      isConfirmedStatus: false,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Dasha',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: 'Notes',
      ordered: new Date(2017, 7, 9, 22, 18),
      reqDelivery: new Date(2017, 7, 9, 22, 18),
      isConfirmedStatus: false,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Masha',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: 'Notes',
      ordered: new Date(2017, 7, 9, 22, 18),
      reqDelivery: new Date(2017, 7, 9, 22, 18),
      isConfirmedStatus: true,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Pasha',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      ordered: new Date('1995-1-2'),
      reqDelivery: new Date('1995-12-17'),
      isConfirmedStatus: false,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Sasha',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      ordered: new Date('1995-1-2'),
      reqDelivery: new Date('1995-12-17'),
      isConfirmedStatus: true,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Igor',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      ordered: new Date('1995-1-2'),
      reqDelivery: new Date('1995-12-17'),
      isConfirmedStatus: false,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Valera',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      ordered: new Date(2021, 5, 1, 11, 3),
      reqDelivery: new Date('1995-12-17'),
      isConfirmedStatus: false,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Sasha',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      ordered: new Date(2021, 4, 31, 7, 18),
      reqDelivery: new Date('1995-12-17'),
      isConfirmedStatus: true,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
    {
      orderNo: 1,
      customer: 'Sasha',
      customerNo: 'BB-243',
      items: [
        { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
        { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      ordered: new Date(2021, 4, 30, 11, 37),
      reqDelivery: new Date('1995-12-17'),
      isConfirmedStatus: true,
      address: { street: 'Main Street 23', city: '1453 Zurich' }
    },
  ],
  filteredCustomers: [],
  filteredOrdersData: [],
  rangeStartDate: new Date(1970, 1, 1),
  rangeEndDate: new Date(2050, 12, 31),
  status: 'Both',
};

export const OrdersReducer = createReducer(
  initialState,
  on(OrdersActions.addCustomersSelectFilteredData, (state, { customer }) => {
    return { ...state, filteredCustomers: [...state.filteredCustomers, customer] }
  }),
  on(OrdersActions.removeCustomerFromSelect, (state, { customer }) => {
    const index = state.filteredCustomers.indexOf(customer);
    return {
      ...state,
      filteredCustomers: [...state.filteredCustomers.slice(0, index), ...state.filteredCustomers.slice(index + 1)]
    }
  }),
  on(OrdersActions.filterCustomerSelect, (state, { customers }) => {
    return { ...state, filteredOrdersData: customers }
  }),
  on(OrdersActions.getRangeStartDate, (state, { startDate }) => {
    return { ...state, rangeStartDate: startDate }
  }),
  on(OrdersActions.getRangeEndDate, (state, { endDate }) => {
    return { ...state, rangeEndDate: endDate }
  }),
  on(OrdersActions.changeStatus, (state, { order }) => {
    const index = state.filteredOrdersData.indexOf(order);
    const newFilteredOrdersData = [...state.filteredOrdersData];
    const status = newFilteredOrdersData[index].isConfirmedStatus;
    newFilteredOrdersData[index] = {
      isConfirmedStatus: !newFilteredOrdersData[index].isConfirmedStatus,
      orderNo: newFilteredOrdersData[index].orderNo,
      customer: newFilteredOrdersData[index].customer,
      address: newFilteredOrdersData[index].address,
      customerNo: newFilteredOrdersData[index].customerNo,
      items: newFilteredOrdersData[index].items,
      notes: newFilteredOrdersData[index].notes,
      ordered: newFilteredOrdersData[index].ordered,
      reqDelivery: newFilteredOrdersData[index].reqDelivery
    };
    return { ...state, filteredOrdersData: newFilteredOrdersData }
  }),
  on(OrdersActions.filterStatus, (state, { status }) => {
    return{...state, status: status}
  }),
  on(OrdersActions.clearAllFilters, (state) => {
    return {...state, filteredCustomers: [], status: 'Both'}
  })
);

export const defaultOrdersSelector = createFeatureSelector<IOrders>('ordersReducer');
export const ordersDataSelector = createSelector(defaultOrdersSelector, state => state.ordersData);
export const filteredCustomersSelector = createSelector(defaultOrdersSelector, state => state.filteredCustomers);
export const filterOrdersDataSelector = createSelector(defaultOrdersSelector, state => state.filteredOrdersData);
export const rangeStartDateSelector = createSelector(defaultOrdersSelector, state => state.rangeStartDate);
export const rangeEndDateSelector = createSelector(defaultOrdersSelector, state => state.rangeEndDate);
export const statusSelector = createSelector(defaultOrdersSelector, state => state.status);
