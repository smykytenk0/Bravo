import { Component, OnInit } from '@angular/core';
import { OrdersData } from '../store/interfaces/orders.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})

export class PrintComponent implements OnInit {
  printInfo = history.state;
  displayedColumns: string[] = ['productCode', 'product', 'unit', 'quantity'];

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

}
