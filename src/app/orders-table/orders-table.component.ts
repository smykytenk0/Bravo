import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filterOrdersDataSelector, ordersDataSelector, rangeStartDateSelector } from '../store/orders/orders.reducer';
import { OrdersService } from '../shared/services/orders.service';
import { OrdersData } from '../store/interfaces/orders.interfaces';
import { Observable } from 'rxjs';
import { OrdersActions } from '../store/orders/orders.actions';
import { Router } from '@angular/router';

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

const ELEMENT_DATA: OdrerElement[] = [
  {
    orderNo: 1,
    customer: 'Sasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Alex',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 },
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },],
    notes: 'Notes',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Dasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: 'Notes',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Masha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: 'Notes',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'Confirm',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Pasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Sasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Igor',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Valera',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Andrey',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Sasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Sasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  }, {
    orderNo: 1,
    customer: 'Sasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Sasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
  {
    orderNo: 1,
    customer: 'Sasha',
    customerNo: 1,
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 'Ordered',
    reqDelivery: 'Delivery',
    status: 'confirmed',
    address: 'Main Street 23, 1453 Zurich'
  },
];


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

export class OrdersTableComponent implements AfterViewInit {
  title: string = 'Orders';
  placeholder: string = "Order, Customer, Notes...";
  displayedColumns: string[] = ['button', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'reqDelivery', 'status'];
  dataSource: MatTableDataSource<OrdersData>;
  dataPickerOpened: boolean = false;
  isCustomersOpened: boolean = false;
  isStatusOpened: boolean = false;
  uniqueCustomers: any;
  ordersData: OrdersData[];
  filteredOrdersData$: Observable<OrdersData[]>;
  dataTable: OrdersData[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: OrdersData | null;
  startDate$: Observable<Date>;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private store: Store, private orders: OrdersService, private router: Router) {
    this.store.pipe(select(ordersDataSelector)).subscribe(data => this.ordersData = data);
    this.store.dispatch(OrdersActions.filterCustomerSelect({ customers: this.ordersData }));
    this.store.select(filterOrdersDataSelector).subscribe( (data) => {
      this.dataSource = new MatTableDataSource<OrdersData>(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uniqueCustomers = Array.from(ELEMENT_DATA.reduce((acc, elem) => acc.add(elem.customer), new Set()));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
