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
  uniqueCustomers: any;
  ordersData: any;
  filteredCustomers: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: OrdersData | null;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  testArray: string[];
  requestCustomers: string;
  status: string;
  requestStatus: string;
  startDate: Date;
  endDate: Date;
  requestDate: string;

  refresh() {
    this.httpService.getOrders().subscribe(data => {
      this.ordersData = data;
      this.dataSource = new MatTableDataSource<OrdersData>(this.ordersData);
      this.dataSource.paginator = this.paginator;
      this.uniqueCustomers = Array.from(this.ordersData.reduce((acc, elem) => acc.add(elem.customer), new Set()));
    })
  }

  constructor(private store: Store,
              private orders: OrdersService,
              private router: Router,
              private httpService: HttpService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.store.select(filteredCustomersSelector).subscribe(data => this.testArray = data);
    this.store.select(statusSelector).subscribe(data => this.status = data);
    this.store.select(rangeStartDateSelector).subscribe(data => this.startDate = data);
    this.store.select(rangeEndDateSelector).subscribe(data => this.endDate = data);
    this.refresh();
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
    this.testArray.length ? this.requestCustomers = 'customer=' + this.testArray.join('&customer=') : this.requestCustomers = '';
    console.log(`http://localhost:3000/orders?${ this.requestCustomers }${ this.requestStatus }`);
    this.http.get(`http://localhost:3000/orders?${ this.requestCustomers }${ this.requestStatus }${ this.requestDate }`).subscribe(data => {
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
