import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CatalogActions } from '../../../store/catalog/catalog.actions';
import { IProduct } from '../../../store/interfaces/catalog.interfaces';

@Component({
  selector: 'app-add-product-modal-window',
  templateUrl: './add-product-modal-window.component.html',
  styleUrls: ['./add-product-modal-window.component.scss']
})
export class AddProductModalWindowComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) private data: IProduct) { }
  productForm = new FormGroup({
    productCode: new FormControl(this.data? this.data.productCode: ''),
    name: new FormControl(this.data? this.data.name: ''),
    unit: new FormControl(this.data? this.data.mainUnit.unit: ''),
    price: new FormControl(this.data? this.data.mainUnit.price: ''),
    availability: new FormControl(this.data? this.data.availability: '')
  });
  productModalTitle: string = this.data? 'Add Product' : 'Edit Product';
  ngOnInit(): void {
  }

  addNewProduct() {
    this.store.dispatch(CatalogActions.addNewProduct({
      product: {
        productCode: this.productForm.value.productCode,
        name: this.productForm.value.name,
        mainUnit: {
          unit: this.productForm.value.unit,
          price: this.productForm.value.price
        },
        availability: this.productForm.value.availability
      }
    }))
  }
}
