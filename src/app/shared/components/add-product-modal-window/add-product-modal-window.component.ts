import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CatalogActions } from '../../../store/catalog/catalog.actions';
import { IProduct } from '../../../store/interfaces/catalog.interfaces';
import { SuccessfulProductAddingComponent } from '../successful-product-adding/successful-product-adding.component';

@Component({
  selector: 'app-add-product-modal-window',
  templateUrl: './add-product-modal-window.component.html',
  styleUrls: ['./add-product-modal-window.component.scss']
})
export class AddProductModalWindowComponent implements OnInit {
  anotherUnits: object[];
  constructor(private dialog: MatDialog,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) private data: IProduct) {
  }

  productForm = new FormGroup({
    productCode: new FormControl(this.data? this.data.productCode: ''),
    name: new FormControl(this.data? this.data.name: ''),
    mainUintName: new FormControl(this.data? this.data.mainUnit.unit: ''),
    mainUnitPrice: new FormControl(this.data? this.data.mainUnit.price: ''),
    price: new FormControl(this.data? this.data.mainUnit.price: ''),
    availability: new FormControl(this.data? this.data.availability: '')
  });
  productModalTitle: string = this.data? 'Add Product' : 'Edit Product';

  ngOnInit(): void {
    this.data? this.anotherUnits = this.data.anotherUnits : [{unit: 'kg', price: 2.03}, {unit: 'kg', price: 2.03}]
  }

  addNewProduct() {
    this.store.dispatch(CatalogActions.addNewProduct({
      product: {
        productCode: this.productForm.value.productCode,
        name: this.productForm.value.name,
        mainUnit: {
          unit: this.productForm.value.mainUintName,
          price: this.productForm.value.mainUnitPrice
        },
        availability: this.productForm.value.availability
      }
    }));
    this.dialog.open(SuccessfulProductAddingComponent);
    setTimeout(()=>{
      this.dialog.closeAll()
    },2000);
  }

  addUnit() {
    this.anotherUnits.push({unit:'', price: 0})
  }
}
