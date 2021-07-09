import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IProduct, IUnit } from '../../../store/interfaces/catalog.interfaces';
import { SuccessfulProductAddingComponent } from '../successful-product-adding/successful-product-adding.component';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-product-modal-window',
  templateUrl: './add-product-modal-window.component.html',
  styleUrls: ['./add-product-modal-window.component.scss']
})
export class AddProductModalWindowComponent implements OnInit, OnDestroy{
  anotherUnits: IUnit[] = [];
  maxUnitsAmount: number = 3;
  anotherUnitsForm: FormGroup;
  unitsArr: number[] = [];
  unitsForm: FormGroup;
  counter: number = 1;
  productForm: FormGroup;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private dialog: MatDialog,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) private data: IProduct,
              private http: HttpClient,
              private httpService: HttpService) {
  }

  addUnitInForm(num){
    this.unitsForm.addControl(`unit${num}`, new FormControl());
    this.unitsForm.addControl(`price${num}`, new FormControl())
  }

  deleteUnitFromForm(num){
    this.unitsForm.removeControl(`unit${num}`);
    this.unitsForm.removeControl(`price${num}`);
  }


  initProductForm(){
    this.productForm = new FormGroup({
      productCode: new FormControl(this.data? this.data.productCode: ''),
      name: new FormControl(this.data? this.data.name: ''),
      availability: new FormControl(this.data? this.data.availability: '')
    });
  }
  productModalTitle: string = this.data? 'Edit Product' : "Add Product";

  ngOnInit(): void {
    this.initProductForm();
    this.unitsForm = new FormGroup({
      unit1: new FormControl(),
      price1: new FormControl()
    });
  }

  addNewProduct() {
    const product = Object.assign(this.productForm, {units: this.unitsForm.value});
    console.log(product);
    this.httpService.addProduct(product).subscribe();
    this.dialog.open(SuccessfulProductAddingComponent);
    setTimeout(()=>{
      this.dialog.closeAll()
    },2000);

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
