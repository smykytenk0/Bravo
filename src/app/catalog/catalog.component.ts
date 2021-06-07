import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../store/interfaces/catalog.interfaces';
import { select, Store } from '@ngrx/store';
import { catalogProductsSelector } from '../store/catalog/catalog.reducer';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteModalWindowComponent } from '../shared/components/product-delete-modal-window/product-delete-modal-window.component';
import { AddProductModalWindowComponent } from '../shared/components/add-product-modal-window/add-product-modal-window.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  title: string = 'Catalog';
  placeholder: string = 'Product code, Name...';
  addBtnText: string = 'Add Product';
  catalogData$: Observable<IProduct[]>;
  displayedColumns: string[] = ['productCode', 'name', 'mainUnit', 'mainUnitPrice', 'availability', 'deleteButton'];

  constructor(private store: Store,
              private dialog: MatDialog) {
    this.catalogData$ = this.store.pipe(select(catalogProductsSelector));
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
}
