import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {
  filteredCustomersSelector, filterOrdersDataSelector,
  ordersDataSelector,
  rangeEndDateSelector,
  rangeStartDateSelector
} from "../../store/orders.reducer";
import {OrdersData} from "../../store/interfaces/interfaces";
import {OrdersActions} from "../../store/orders.actions";

@Injectable({providedIn:'root'})
export class OrdersService{
  filteredCustomers: string[];
  filteredOrdersData: OrdersData[];
  rangeStartDate: Date;
  rangeEndDate: Date;
  constructor(private store: Store) {}

  getOrdersData(){
    this.store.pipe(select(ordersDataSelector)).subscribe( data => this.filteredOrdersData = data);
  }


  ordersFilter(){
    this.getOrdersData();
    this.store.pipe(select(rangeStartDateSelector)).subscribe(data => this.rangeStartDate = data);
    this.store.pipe(select(rangeEndDateSelector)).subscribe( data => this.rangeEndDate = data);
    this.store.pipe(select(filteredCustomersSelector)).subscribe( data => this.filteredCustomers = data);
    if(this.filteredCustomers.length != 0){
      return this.store.dispatch(OrdersActions.filterCustomerSelect({customers: this.filteredOrdersData.filter(data => this.filteredCustomers.indexOf(data.customer)!=-1 && data.ordered > this.rangeStartDate && data.ordered < this.rangeEndDate)}))
    }
    return this.store.dispatch(OrdersActions.filterCustomerSelect({customers: this.filteredOrdersData.filter(data => data.ordered > this.rangeStartDate && data.ordered < this.rangeEndDate)}))
  }
}
