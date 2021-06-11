import { Component, OnInit } from '@angular/core';
import { OrdersData } from '../store/interfaces/orders.interfaces';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})

export class PrintComponent implements OnInit {
  printInfo: OrdersData = {
    orderNo: 35322,
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: [
      { productCode: 'APP123', product: 'Apples', unit: 'kg', quantity: 14 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 },
      { productCode: 'TOM53', product: 'Tomatoes', unit: 'box', quantity: 4 }],
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: new Date(2017, 7, 9, 22, 18),
    reqDelivery: new Date(2017, 7, 9, 22, 18),
    status: 'confirmed',
    address: { street: 'Main Street 23', city: '1453 Zurich' }
  };
  displayedColumns: string[] = ['productCode', 'product', 'unit', 'quantity'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
