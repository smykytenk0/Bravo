import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IProduct } from '../../../store/interfaces/catalog.interfaces';
import { SuccessfulProductAddingComponent } from '../successful-product-adding/successful-product-adding.component';
import { HttpService } from '../../services/http.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-product-modal-window',
  templateUrl: './add-product-modal-window.component.html',
  styleUrls: ['./add-product-modal-window.component.scss']
})
export class AddProductModalWindowComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  maxUnitsAmount: number = 3;
  unitsArr: number[] = [];
  unitsForm: FormGroup;
  counter: number = 2;
  productForm: FormGroup;
  productModalTitle: string = this.data ? 'Edit Product' : 'Add Product';

  constructor(private dialog: MatDialog,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) private data: IProduct,
              private http: HttpClient,
              private httpService: HttpService) {
    this.unitsForm = new FormGroup({
      unit1: new FormControl(),
      price1: new FormControl()
    });
  }

  ngOnInit(): void {
    this.initProductForm();
  }

  addUnitInForm(num) {
    this.unitsForm.addControl(`unit${ num }`, new FormControl());
    this.unitsForm.addControl(`price${ num }`, new FormControl())
  }

  deleteUnitFromForm(num) {
    this.unitsForm.removeControl(`unit${ num }`);
    this.unitsForm.removeControl(`price${ num }`);
  }


  initProductForm() {
    this.productForm = new FormGroup({
      productCode: new FormControl(this.data ? this.data.productCode : ''),
      name: new FormControl(this.data ? this.data.name : ''),
      availability: new FormControl(this.data ? this.data.availability : '')
    });
  }

  addNewProduct() {
    let units = [{
      unit: this.unitsForm.value.unit1,
      price: this.unitsForm.value.price1
    }];
    for (let i of this.unitsArr) {
      const unit = {
        unit: this.unitsForm.value[`unit${ i }`],
        price: this.unitsForm.value[`price${ i }`]
      };
      units.push(unit)
    }
    const product = Object.assign(this.productForm.value, { units: units });
    this.httpService.addProduct(product).pipe(takeUntil(this.unsubscribeAll)).subscribe();
    this.dialog.open(SuccessfulProductAddingComponent);
    setTimeout(() => {
      this.dialog.closeAll()
    }, 2000);
  }

  addUnit() {
    this.addUnitInForm(this.counter);
    this.unitsArr.push(this.counter);
    this.counter++;
  }

  deleteUnit() {
    this.deleteUnitFromForm(this.counter);
    this.unitsArr.pop();
    this.counter--;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
