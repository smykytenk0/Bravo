import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from '../../../store/interfaces/catalog.interfaces';
import { Store } from '@ngrx/store';
import { CatalogActions } from '../../../store/catalog/catalog.actions';

@Component({
  selector: 'app-product-delete-modal-window',
  templateUrl: './product-delete-modal-window.component.html',
  styleUrls: ['./product-delete-modal-window.component.scss']
})
export class ProductDeleteModalWindowComponent{

  constructor(private store: Store,
              @Inject(MAT_DIALOG_DATA) private data: IProduct) {
  }


  deleteProduct() {
    this.store.dispatch(CatalogActions.deleteProduct({product: this.data}))
  }
}
