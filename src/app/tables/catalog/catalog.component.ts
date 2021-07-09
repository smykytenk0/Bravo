import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../../store/interfaces/catalog.interfaces';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteModalWindowComponent } from '../../shared/components/product-delete-modal-window/product-delete-modal-window.component';
import { AddProductModalWindowComponent } from '../../shared/components/add-product-modal-window/add-product-modal-window.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '../../shared/services/http.service';
import { roleSelector } from '../../store/auth/auth.reducer';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnDestroy, OnInit {
  title: string = 'Catalog';
  placeholder: string = 'Product code, Name...';
  addBtnText: string = 'Add Product';
  dataSource: MatTableDataSource<IProduct>;
  catalogData: any = [];
  displayedColumns: string[];
  role: string;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store,
              private dialog: MatDialog,
              private httpService: HttpService) {
  }

  refresh() {
    this.httpService.getCatalog()
      .subscribe((data) => {
        this.catalogData = data;
        this.dataSource = new MatTableDataSource<IProduct>(this.catalogData);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnInit(): void {
    this.refresh();
    this.store.select(roleSelector).subscribe(data => {
      this.role = data;
      this.role == 'admin'? this.displayedColumns = ['firstEmptyColumn', 'productCode', 'name', 'mainUnit', 'mainUnitPrice', 'availability', 'deleteButton', 'lastEmptyColumn'] : this.displayedColumns = ['firstEmptyColumn', 'productCode', 'name', 'mainUnit', 'mainUnitPrice', 'availability', 'lastEmptyColumn']
    });
  }

  openDeleteModalWindow(element) {
    this.dialog.open(ProductDeleteModalWindowComponent, {
      data: element
    }).afterClosed()
      .pipe(takeUntil(this.unsubscribeAll)).subscribe(() => {
      this.refresh();
      this.refresh();
    })
  }

  openAddProductModalWindow() {
    this.dialog.open(AddProductModalWindowComponent)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeAll)).subscribe(() => {
      this.refresh();
      this.refresh();
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
