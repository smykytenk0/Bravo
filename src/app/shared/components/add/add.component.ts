import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerModalWindowComponent } from '../add-customer-modal-window/add-customer-modal-window.component';
import { Router } from '@angular/router';
import { AddProductModalWindowComponent } from '../add-product-modal-window/add-product-modal-window.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent  {
  @Input() addBtnText;
}
