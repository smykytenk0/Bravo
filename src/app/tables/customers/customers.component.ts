import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ICustomerData } from '../../store/interfaces/customers.interfacers';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerModalWindowComponent } from '../../shared/components/add-customer-modal-window/add-customer-modal-window.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnDestroy, OnInit{
  title: string = 'Customers';
  placeholder: string = "Customer No, Name, Address...";
  addCustomer: string = "Add Customer";
  customersData: ICustomerData[] = [];
  dataSource: MatTableDataSource<ICustomerData>;
  displayedColumns: string[] = ['firstEmptyColumn', 'customerNo', 'name', 'address', 'deliveryDays', 'lastEmptyColumn'];
  private unsubscribeAll: Subject<any> = new Subject<any>();
  role: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store,
              private dialog: MatDialog,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.httpService.getCustomers({role: 1}).pipe(takeUntil(this.unsubscribeAll)).subscribe(data=> {
      this.customersData = data;
      this.dataSource = new MatTableDataSource<ICustomerData>(this.customersData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  OpenCustomersTableTr(row) {
    this.dialog.open(AddCustomerModalWindowComponent, {
      data: row
    }).afterClosed()
      .pipe(takeUntil(this.unsubscribeAll)).subscribe( () => {
      this.refresh();
      this.refresh();
    })
  }

  openAddCustomerModalWindow() {
    this.dialog.open(AddCustomerModalWindowComponent)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll)).subscribe( () => {
        this.refresh();
        this.refresh();
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete()
  }
}

