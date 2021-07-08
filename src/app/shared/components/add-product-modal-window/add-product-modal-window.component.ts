import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CatalogActions } from '../../../store/catalog/catalog.actions';
import { IProduct, IUnit } from '../../../store/interfaces/catalog.interfaces';
import { SuccessfulProductAddingComponent } from '../successful-product-adding/successful-product-adding.component';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-product-modal-window',
  templateUrl: './add-product-modal-window.component.html',
  styleUrls: ['./add-product-modal-window.component.scss']
})
export class AddProductModalWindowComponent implements OnInit, OnDestroy{
  anotherUnits: IUnit[] = [];
  maxUnitsAmount: number = 3;
  anotherUnitsForm: FormGroup;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private dialog: MatDialog,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) private data: IProduct,
              private http: HttpClient,
              private httpService: HttpService) {
  }

  private initAnotherUnitsForm(){
    const anotherUnitsControl = this.anotherUnits.reduce((previous, current) => {
      const index = this.anotherUnits.indexOf(current);
      return {
        ...previous,
        [`Unit-${index+1}`]: new FormControl(current.unit),
        [`Price-${index+1}`]: new FormControl(current.price)
      }
    }, {});
    this.anotherUnitsForm = new FormGroup(anotherUnitsControl);
  };

  productForm = new FormGroup({
    productCode: new FormControl(this.data? this.data.productCode: ''),
    name: new FormControl(this.data? this.data.name: ''),
    mainUintName: new FormControl(this.data? this.data.mainUnit.unit: ''),
    mainUnitPrice: new FormControl(this.data? this.data.mainUnit.price: ''),
    price: new FormControl(this.data? this.data.mainUnit.price: ''),
    availability: new FormControl(this.data? this.data.availability: '')
  });
  productModalTitle: string = this.data? 'Edit Product' : "Add Product";

  ngOnInit(): void {
    this.initAnotherUnitsForm();
    this.data? this.anotherUnits = this.data.anotherUnits : [{unit: 'kg', price: 2.03}, {unit: 'kg', price: 2.03}]
  }

  addNewProduct() {
    const product = {
      productCode: this.productForm.value.productCode,
      name: this.productForm.value.name,
      mainUnit: {
        unit: this.productForm.value.mainUintName,
        price: this.productForm.value.mainUnitPrice
      },
      anotherUnits: this.anotherUnits.length? this.anotherUnits: null,
      availability: this.productForm.value.availability
    };
    this.httpService.addProduct(product).subscribe();
    this.dialog.open(SuccessfulProductAddingComponent);
    setTimeout(()=>{
      this.dialog.closeAll()
    },2000);

  }

  addUnit() {
    this.anotherUnits.push({unit: '', price: 0});
    this.initAnotherUnitsForm()
  }

  deleteUnit(unit) {
    this.anotherUnits.shift();
    this.initAnotherUnitsForm()
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
