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
  rangeEndDateSelector,
  rangeStartDateSelector,
  statusSelector
} from '../../store/orders/orders.reducer';
import { HttpClient } from '@angular/common/http';
import { emailSelector, roleSelector } from '../../store/auth/auth.reducer';
import { MatDialog } from '@angular/material/dialog';
import { AddOrderModalWindowComponent } from '../../shared/components/add-order-modal-window/add-order-modal-window.component';
import { filter, mergeMap, scan, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { OrderActionsEnum } from '../../shared/enums/orderActions.enum';
import { getEnumKeys, getTotalOrderPrice } from '../../shared/services/helper'

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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribeAll: Subject<any> = new Subject<any>();
  title: string = 'Orders';
  placeholder: string = 'Order, Customer, Notes...';
  displayedColumns: string[] = ['firstEmptyColumn', 'button', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'reqDelivery', 'totalPrice', 'status', 'statusActions', 'lastEmptyColumn'];
  dataSource: MatTableDataSource<OrdersData>;
  dataSource$: Observable<any> = this.httpService.getOrders();
  dataPickerOpened: boolean = false;
  isCustomersOpened: boolean = false;
  isStatusOpened: boolean = false;
  uniqueCustomers: any = [];
  uniqueProductCodes: any = [];
  ordersData: any = [];
  expandedElement: OrdersData | null;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  status: string;
  startDate: Date;
  endDate: Date;
  email: string;
  role: number;
  possibleStatuses: string[];
  customerFilter$ = new BehaviorSubject<string[]>([]);
  statusFilter$ = new BehaviorSubject<number>(-1);
  roleFilter$ = new BehaviorSubject<number>(null);
  emailFilter$ = new BehaviorSubject<string>('');

  filteredData$ = combineLatest([
    this.customerFilter$,
    this.statusFilter$,
    this.roleFilter$,
    this.emailFilter$
  ]).pipe(switchMap(([customers, status, role, email]) => {
    return this.dataSource$.pipe(
      mergeMap(item => item),
      filter(order => {
        const customerCondition = customers.length ? customers.indexOf(order['customerData'].name) != -1 : true;
        const userCondition = role ? order['customerData'].email == email : true;
        const statusCondition = !status;
        return customerCondition && userCondition && statusCondition;
      }),
      scan((arr, item) => [...arr, item], [])
    )
  }))

  constructor(private store: Store,
              private orders: OrdersService,
              private router: Router,
              private httpService: HttpService,
              private http: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.filteredData$.subscribe(item => console.log(item));
    this.store.select(roleSelector).subscribe(data => this.role = data);
    this.roleFilter$.next(this.role);
    this.store.select(emailSelector).subscribe(data => this.email = data);
    this.emailFilter$.next(this.email);
    this.httpService.getCustomers({ role: 1 }).subscribe(data => this.getUniqueCustomers(data));
    this.httpService.getCatalog({ availability: 'In stock' }).subscribe(data => this.getUniqueProductNames(data));
    this.store.select(rangeStartDateSelector).subscribe(data => this.startDate = data);
    this.store.select(rangeEndDateSelector).subscribe(data => this.endDate = data);
    this.refresh();
    this.possibleStatuses = getEnumKeys(OrderActionsEnum);
  }

  getTotalPrice(order): number {
    return getTotalOrderPrice(order)
  };

  refresh(): void {
    this.filteredData$.subscribe(data => {
      console.log(data);
      this.ordersData = data;
      this.dataSource = new MatTableDataSource<OrdersData>(this.ordersData);
      this.dataSource.paginator = this.paginator;
    })
  }

  getUniqueCustomers(array: any): void {
    for (let i of array) {
      if (this.uniqueCustomers.indexOf(i.name) == -1) {
        this.uniqueCustomers.push(i.name);
      }
    }
  }

  getUniqueProductNames(array: any): void {
    for (let i of array) {
      if (this.uniqueProductCodes.indexOf(i.productCode) == -1) {
        this.uniqueProductCodes.push(i.productCode);
      }
    }
  }

  toggleDataPicker(): void {
    this.dataPickerOpened = !this.dataPickerOpened;
  }

  customerSelectOpen(): void {
    this.isCustomersOpened = !this.isCustomersOpened;
  }

  toggleStatusSelect(): void {
    this.isStatusOpened = !this.isStatusOpened;
  }

  JsonDateParse(date): Date {
    return new Date(date);
  }

  enterDatepickerData(): void {
    this.store.dispatch(OrdersActions.getRangeStartDate({ startDate: this.range.value.start }));
    this.store.dispatch(OrdersActions.getRangeEndDate({ endDate: this.range.value.end }));
    this.orders.ordersFilter();
  }

  cancelDatepickerData(): void {
  }

  openPrint(row): void {
    this.router.navigate(['/print'], { state: row })
  }

  removeAllFilters() {
    this.store.dispatch(OrdersActions.clearAllFilters());
    this.refresh();
  }

  openAddOrderModalWindow() {
    this.dialog.open(AddOrderModalWindowComponent, { data: this.uniqueProductCodes }).afterClosed().subscribe(() => {
      this.refresh();
    })
  }

  takeCurrentSearch(currentSearch: string) {
    this.dataSource.filter = currentSearch.trim().toLowerCase();
  }

  getStatus(currentStatus: number) {
    console.log(currentStatus)
    this.statusFilter$.next(currentStatus);
    this.refresh()
  }

  changeStatus(event: number, element: any) {
    this.httpService.changeOrdersStatus(element, event).subscribe();
    this.refresh();
  }

  filterCustomers($event: string[]) {
    this.customerFilter$.next($event);
    this.refresh()
  }

  ngOnDestroy(): void {
    this.store.dispatch(OrdersActions.clearAllFilters());
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
