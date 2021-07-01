import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OrdersService } from '../../shared/services/orders.service';
import { OrdersData } from '../../store/interfaces/orders.interfaces';
import { OrdersActions } from '../../store/orders/orders.actions';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import {
  filteredCustomersSelector,
  rangeEndDateSelector,
  rangeStartDateSelector,
  statusSelector
} from '../../store/orders/orders.reducer';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrdersTableComponent implements OnInit, OnDestroy {
  title: string = 'Orders';
  placeholder: string = 'Order, Customer, Notes...';
  displayedColumns: string[] = ['firstEmptyColumn', 'button', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'reqDelivery', 'status', 'lastEmptyColumn'];
  dataSource: MatTableDataSource<OrdersData>;
  dataPickerOpened: boolean = false;
  isCustomersOpened: boolean = false;
  isStatusOpened: boolean = false;
  uniqueCustomers: any = [];
  ordersData: any;
  filteredCustomers: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: OrdersData | null;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  requestCustomers: string = '';
  status: string;
  requestStatus: string;
  startDate: Date;
  endDate: Date;
  customer: object;
  selectedCustomersArray: string[];
  selectedCustomersIdArray: string[] = [];

  refresh() {
    this.httpService.getOrders().subscribe(data => {
      this.ordersData = data;
      this.dataSource = new MatTableDataSource<OrdersData>(this.ordersData);
      this.dataSource.paginator = this.paginator;
    })
  }

  getUniqueCustomers(array: any) {
    for (let i of array) {
      if (this.uniqueCustomers.indexOf(i.name) == -1) {
        this.uniqueCustomers.push(i.name);
      }
    }
  }

  constructor(private store: Store,
              private orders: OrdersService,
              private router: Router,
              private httpService: HttpService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.refresh();
    this.httpService.getCustomers().subscribe(data => this.getUniqueCustomers(data));
    this.store.select(statusSelector).subscribe(data => this.status = data);
    this.store.select(rangeStartDateSelector).subscribe(data => this.startDate = data);
    this.store.select(rangeEndDateSelector).subscribe(data => this.endDate = data);
  }

  toggleDataPicker() {
    this.dataPickerOpened = !this.dataPickerOpened;
  }

  customerSelectOpen() {
    this.isCustomersOpened = !this.isCustomersOpened;
  }

  openStatusSelect() {
    this.isStatusOpened = !this.isStatusOpened;
  }

  JsonDateParse(date): Date {
    return new Date(date);
  }

  getCustomerId(customer){
    return customer.id
  }

  convertSelectedCustomerToRequest(selectedCustomer: string[]){
    let customerRequest = '';
    for (let i of selectedCustomer){
      this.http.get(`http://localhost:3000/customers?name=${i}`).subscribe(data => {
        console.log(this.getCustomerId(data[0]));
        customerRequest += `id=${this.getCustomerId(data[0])}&`;
        console.log(customerRequest);
      });
    }
    console.log(customerRequest);
    return customerRequest
  }

  filterData() {
    switch (this.status) {
      case 'Confirmed':
        this.requestStatus = '&isConfirmedStatus=true';
        break;
      case 'Both':
        this.requestStatus = '';
        break;
      case 'Not confirmed':
        this.requestStatus = '&isConfirmedStatus=false';
        break;
    }
    this.store.select(filteredCustomersSelector).subscribe(data => this.selectedCustomersArray = data);
    this.httpService.convertSelectedCustomers(this.selectedCustomersArray);
    this.httpService.getOrders(this.requestCustomers + this.requestStatus).subscribe(data => {
        this.ordersData = data;
        this.dataSource = new MatTableDataSource<OrdersData>(this.ordersData);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  enterDatepickerData() {
    this.store.dispatch(OrdersActions.getRangeStartDate({ startDate: this.range.value.start }));
    this.store.dispatch(OrdersActions.getRangeEndDate({ endDate: this.range.value.end }));
    this.orders.ordersFilter();
  }

  cancelDatepickerData() {
  }

  openPrint(row) {
    this.router.navigate(['/print'], { state: row })
  }

  ngOnDestroy(): void {
    this.store.dispatch(OrdersActions.clearAllFilters());
  }

  removeAllFilters() {
    this.store.dispatch(OrdersActions.clearAllFilters());
    this.refresh();
  }
}
