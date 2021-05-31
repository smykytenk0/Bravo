import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {filteredCustomersSelector, ordersDataSelector} from "../../store/orders.reducer";
import {OrdersData} from "../../store/interfaces/interfaces";
import {OrdersActions} from "../../store/orders.actions";

@Injectable({providedIn:'root'})
export class OrdersService{
  filteredCustomers: string[];
  ordersData: OrdersData[];
  constructor(private store: Store) {}

  selectCustomersFilter(){
    this.store.pipe(select(filteredCustomersSelector)).subscribe(data=>this.filteredCustomers = data);
    this.store.pipe(select(ordersDataSelector)).subscribe(data=> this.ordersData = data);
    if(this.filteredCustomers.length != 0){
      return this.store.dispatch(OrdersActions.filterCustomerSelect({customers: this.ordersData.filter(data => this.filteredCustomers.indexOf(data.customer)!=-1)}))
    }
    return this.store.dispatch(OrdersActions.filterCustomerSelect({customers: this.ordersData}))
  }

}
