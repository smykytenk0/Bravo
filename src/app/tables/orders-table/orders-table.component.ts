import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filterOrdersDataSelector, ordersDataSelector, rangeStartDateSelector } from '../../store/orders/orders.reducer';
import { OrdersService } from '../../shared/services/orders.service';
import { OrdersData } from '../../store/interfaces/orders.interfaces';
import { Observable } from 'rxjs';
import { OrdersActions } from '../../store/orders/orders.actions';
import { Router } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';

export interface OdrerElement {
  orderNo: number,
  customer: string,
  customerNo: number,
  items: object,
  notes: string,
  ordered: string,
  reqDelivery: string,
  status: string,
  address: string
}

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

export class OrdersTableComponent implements OnInit {
  title: string = 'Orders';
  placeholder: string = "Order, Customer, Notes...";
  displayedColumns: string[] = ['firstEmptyColumn', 'button', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'reqDelivery', 'status', 'lastEmptyColumn'];
  dataSource: MatTableDataSource<OrdersData>;
  dataPickerOpened: boolean = false;
  isCustomersOpened: boolean = false;
  isStatusOpened: boolean = false;
  uniqueCustomers: any;
  ordersData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: OrdersData | null;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  refresh(){
    this.httpService.getOrders().subscribe(  data => {
      this.ordersData = data;
      this.dataSource = new MatTableDataSource<OrdersData>(this.ordersData);
      this.dataSource.paginator = this.paginator;
      this.uniqueCustomers = Array.from(this.ordersData.reduce((acc, elem) => acc.add(elem.customer), new Set()));
    })
  }

  constructor(private store: Store,
              private orders: OrdersService,
              private router: Router,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  toggleDataPicker() {
    this.dataPickerOpened = !this.dataPickerOpened;
  }

  customerSelectOpen() {
    this.isCustomersOpened = !this.isCustomersOpened;
  }

  openStatusSelect() {
    this.isStatusOpened = !this.isStatusOpened
  }

  enterDatepickerData() {
    this.store.dispatch(OrdersActions.getRangeStartDate({ startDate: this.range.value.start }));
    this.store.dispatch(OrdersActions.getRangeEndDate({ endDate: this.range.value.end }));
    this.orders.ordersFilter();
  }

  cancelDatepickerData() {
  }

  openPrint(row) {
    this.router.navigate(['/orders/print'], {state: row})
  }
}
