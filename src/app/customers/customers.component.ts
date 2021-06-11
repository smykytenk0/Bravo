import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { ICustomerData, ICustomers } from '../store/interfaces/customers.interfacers';
import { select, Store } from '@ngrx/store';
import { customersSelector } from '../store/customers/customers.reducer';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerModalWindowComponent } from '../shared/components/add-customer-modal-window/add-customer-modal-window.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit, OnDestroy{
  title: string = 'Customers';
  placeholder: string = "Customer No, Name, Address...";
  addCustomer: string = "Add Customer";
  customersData: ICustomerData[];
  dataSource: MatTableDataSource<ICustomerData>;
  displayedColumns: string[] = ['customerNo', 'name', 'address', 'deliveryDays'];
  private unsubscribeAll: Subject<any> = new Subject<any>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store, private dialog: MatDialog) {
    this.store.select(customersSelector)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data)=>{
        this.customersData = data;
        this.dataSource = new MatTableDataSource<ICustomerData>(this.customersData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  OpenCustomersTableTr(row) {
    this.dialog.open(AddCustomerModalWindowComponent, {
      data: row
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete()
  }
}

