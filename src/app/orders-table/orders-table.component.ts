import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";

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
  {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
    {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
    {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
    notes: "+1 Bottle Coca Cola Please, Need to be delivered Today!", ordered: "Ordered", reqDelivery: "Delivery", status: "Status", address: "Main Street 23, 1453 Zurich"},
  {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
      {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
      {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4},
      {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},] ,
    notes: "Notes", ordered: "Ordered", reqDelivery: "Delivery", status: "Status",address: "Main Street 23, 1453 Zurich"},
  {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
      {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
      {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
    notes: "Notes", ordered: "Ordered", reqDelivery: "Delivery", status: "Status", address: "Main Street 23, 1453 Zurich"},
  {orderNo: 1, customer: "Sasha", customerNo: 1, items:[
      {productCode: 'APP123',product: 'Apples', unit:'kg', quantity: 14},
      {productCode: 'TOM53',product: 'Tomatoes', unit:'box', quantity: 4}] ,
    notes: "Notes", ordered: "Ordered", reqDelivery: "Delivery", status: "Status", address: "Main Street 23, 1453 Zurich"},
];

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrdersTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['button', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'reqDelivery', 'status'];
  dataSource = new MatTableDataSource<OdrerElement>(ELEMENT_DATA);
  dataPickerOpened: boolean = false;
  isCustomersOpened: boolean = false;
  uniqueCustomers: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement:  OdrerElement | null;

  constructor(public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDataPicker() {
    this.dataPickerOpened = !this.dataPickerOpened;
    console.log(this.dataPickerOpened)
  }

  customerSelectOpen() {
    this.isCustomersOpened = !this.isCustomersOpened;
    this.uniqueCustomers = ELEMENT_DATA.reduce((acc,elem)=>acc.add(elem.customer), new Set());
  }

}


