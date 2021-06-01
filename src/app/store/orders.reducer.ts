import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {IOrders} from "./interfaces/orders.interfaces";
import {OrdersActions} from "./orders.actions";

export const initialState: IOrders = {
  ordersData: [
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: new Date(2017, 7, 9, 22, 18), reqDelivery: new Date(2017, 7, 9, 22, 18), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Alex", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4},
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},] ,
      notes: "Notes", ordered: new Date(2017, 7, 9, 22, 18), reqDelivery: new Date(2017, 7, 9, 22, 18), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Dasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "Notes", ordered: new Date(2017, 7, 9, 22, 18), reqDelivery: new Date(2017, 7, 9, 22, 18), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Masha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "Notes", ordered: new Date(2017, 7, 9, 22, 18), reqDelivery: new Date(2017, 7, 9, 22, 18), status: "Confirm", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Pasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: new Date('1995-1-2'), reqDelivery: new Date('1995-12-17'), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: new Date('1995-1-2'), reqDelivery: new Date('1995-12-17'), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Igor", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: new Date('1995-1-2'), reqDelivery:new Date('1995-12-17'), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Valera", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: new Date(2021, 5, 1, 11, 3), reqDelivery: new Date('1995-12-17'), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered:new Date(2021, 4, 31, 7, 18), reqDelivery: new Date('1995-12-17'), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: new Date(2021, 4, 30, 11, 37), reqDelivery: new Date('1995-12-17'), status: "confirmed", address: "Main Street 23, 1453 Zurich"},
      ],
  filteredCustomers: [],
  filteredOrdersData: [],
  rangeStartDate: new Date(1970, 1, 1),
  rangeEndDate: new Date(2050, 12, 31),
};

export const OrdersReducer = createReducer(
  initialState,
  on(OrdersActions.addCustomersSelectFilteredData, (state, {customer})=>{
    return {...state, filteredCustomers: [...state.filteredCustomers, customer]}
  }),
  on(OrdersActions.removeCustomerFromSelect, (state, {customer})=>{
    const index = state.filteredCustomers.indexOf(customer);
    return {...state, filteredCustomers: [...state.filteredCustomers.slice(0, index), ...state.filteredCustomers.slice(index+1)]}
  }),
  on(OrdersActions.filterCustomerSelect, (state, {customers})=>{
    return {...state, filteredOrdersData: customers}
  }),
  on(OrdersActions.getRangeStartDate, (state, {startDate})=>{
    return{...state, rangeStartDate: startDate}
  }),
  on(OrdersActions.getRangeEndDate, (state, {endDate})=>{
    return{...state, rangeEndDate: endDate}
  })
);

export const defaultOrdersSelector = createFeatureSelector<IOrders>('ordersReducer');
export const ordersDataSelector = createSelector(defaultOrdersSelector, state=>state.ordersData);
export const filteredCustomersSelector = createSelector(defaultOrdersSelector, state=>state.filteredCustomers);
export const filterOrdersDataSelector = createSelector(defaultOrdersSelector, state=>state.filteredOrdersData);
export const rangeStartDateSelector = createSelector(defaultOrdersSelector, state=>state.rangeStartDate);
export const rangeEndDateSelector = createSelector(defaultOrdersSelector, state=>state.rangeEndDate);
