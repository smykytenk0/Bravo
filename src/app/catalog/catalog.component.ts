import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../store/interfaces/catalog.interfaces';
import { select, Store } from '@ngrx/store';
import { catalogProductsSelector } from '../store/catalog/catalog.reducer';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteModalWindowComponent } from '../shared/components/product-delete-modal-window/product-delete-modal-window.component';
import { AddProductModalWindowComponent } from '../shared/components/add-product-modal-window/add-product-modal-window.component';
import { MatTableDataSource } from '@angular/material/table';
import { ICustomerData } from '../store/interfaces/customers.interfacers';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements  OnDestroy, OnInit{
  title: string = 'Catalog';
  placeholder: string = 'Product code, Name...';
  addBtnText: string = 'Add Product';
  dataSource: MatTableDataSource<IProduct>;
  catalogData: any = [];
  displayedColumns: string[] = ['firstEmptyColumn', 'productCode', 'name', 'mainUnit', 'mainUnitPrice', 'availability', 'deleteButton', 'lastEmptyColumn'];
  private unsubscribeAll: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private store: Store,
              private dialog: MatDialog,
              private httpService: HttpService) {
    this.httpService.getCatalog()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data)=>{
        this.catalogData = data;
        this.dataSource =   new MatTableDataSource<IProduct>(this.catalogData);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnInit(): void {
  }

  transformUnits(element: IProduct):string{
    if(element.anotherUnits){
      return `${element.mainUnit.unit} +${element.anotherUnits.length} more`
    }
    return `${element.mainUnit.unit}`
  }

  openDeleteModalWindow(element) {
    this.dialog.open(ProductDeleteModalWindowComponent, {
      data: element
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
