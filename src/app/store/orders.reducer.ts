import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {IOrders} from "./interfaces/interfaces";
import {OrdersActions} from "./orders.actions";

export const initialState: IOrders = {
  ordersData: [
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Alex", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4},
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},] ,
      notes: "Notes", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Dasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "Notes", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Masha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "Notes", ordered: "Ordered", reqDelivery: "Delivery", status: "Confirm", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Pasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Igor", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Valera", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Andrey", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"}, {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
    {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
        {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
        {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
      notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "confirmed", address: "Main Street 23, 1453 Zurich"},
  ],
  filteredCustomers: []
};

export const OrdersReducer = createReducer(
  initialState,
  on(OrdersActions.addCustomersSelectFilteredData, (state, {customer})=>{
    return {...state, filteredCustomers: [...state.filteredCustomers, customer]}
  }),
  on(OrdersActions.removeCustomerFromSelect, (state, {index})=>{
    return {...state, filteredCustomers: [...state.filteredCustomers.slice(0, index), ...state.filteredCustomers.slice(index+1)]}
  })
);

export const defaultOrdersSelector = createFeatureSelector<IOrders>('ordersReducer');
export const ordersDataSelector = createSelector(defaultOrdersSelector, state=>state.ordersData);
export const filteredCustomersSelector = createSelector(defaultOrdersSelector, state=>state.filteredCustomers);
