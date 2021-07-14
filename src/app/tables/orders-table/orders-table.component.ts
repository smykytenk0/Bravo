import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { emailSelector, loginStatusSelector, roleSelector } from '../../store/auth/auth.reducer';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderModalWindowComponent } from '../../shared/components/add-order-modal-window/add-order-modal-window.component';
import { filter, map, tap } from 'rxjs/operators';

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
  uniqueProductCodes: any = [];
  ordersData: any = [];
  filteredCustomers: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: OrdersData | null;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  status: string;
  requestStatus: boolean[];
  startDate: Date;
  endDate: Date;
  customer: object;
  selectedCustomersArray: string[];
  customerEmails: string[];
  email: string;
  role: string;

  refresh(params = {}) {
    (this.role == 'customer' ? this.httpService.getOrders(params)
      .pipe(
        map(item => Object.values(item)
          .filter(item => item.customerData.email == this.email)
        )
      ) : this.httpService.getOrders(params)).subscribe(data => {
      this.ordersData = data;
      console.log(data);
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

  getUniqueProductNames(array: any) {
    for (let i of array) {
      if (this.uniqueProductCodes.indexOf(i.productCode) == -1) {
        this.uniqueProductCodes.push(i.productCode);
      }
    }
  }

  constructor(private store: Store,
              private orders: OrdersService,
              private router: Router,
              private httpService: HttpService,
              private http: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.select(roleSelector).subscribe(data => this.role = data);
    this.store.select(emailSelector).subscribe(data => this.email = data);
    this.httpService.getCustomers({ role: 'customer' }).subscribe(data => this.getUniqueCustomers(data));
    this.httpService.getCatalog({ availability: 'In stock' }).subscribe(data => this.getUniqueProductNames(data));
    this.store.select(statusSelector).subscribe(data => this.status = data);
    this.store.select(rangeStartDateSelector).subscribe(data => this.startDate = data);
    this.store.select(rangeEndDateSelector).subscribe(data => this.endDate = data);
    this.role == 'customer' ?
      this.refresh({ customerData: { email: this.email } })
      : this.refresh();
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
        this.requestStatus = [true];
        break;
      case 'Both':
        this.requestStatus = [true, false];
        break;
      case 'Not confirmed':
        this.requestStatus = [false];
        break;
    }
    this.store.select(filteredCustomersSelector).subscribe(data => this.selectedCustomersArray = data);
    this.httpService.convertSelectedCustomers(this.selectedCustomersArray).subscribe(data => {
      let customerEmails = [];
      Object.values(data).map(item => customerEmails.push(item.email));
      console.log(customerEmails);
      this.customerEmails = customerEmails;
      this.role == 'admin' ?
        this.refresh({ isConfirmedStatus: this.requestStatus })
        : this.httpService.getCustomers({ email: this.email }).subscribe(data => this.refresh({
          isConfirmedStatus: this.requestStatus
        }))
    });
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
    console.log(this.role);
    this.role == 'customer' ?
      this.httpService.getCustomers({ email: this.email }).subscribe(data => this.refresh({ customerId: data[0].id }))
      : this.refresh();
  }

  openAddOrderModalWindow() {
    this.dialog.open(AddOrderModalWindowComponent, { data: this.uniqueProductCodes }).afterClosed().subscribe(() => {
      this.refresh();
    })

  }

  takeCurrentSearch(currentSearch: string) {
    this.dataSource.filter = currentSearch.trim().toLowerCase();
  }

  getStatus(currentStatus: string) {
    this.store.dispatch(OrdersActions.filterStatus({status: currentStatus}));
    this.filterData();
  }
}
