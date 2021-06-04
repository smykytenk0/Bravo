import { Component, OnInit } from '@angular/core';
import { DAYS_SHORT } from '../../constants';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-modal-window',
  templateUrl: './add-product-modal-window.component.html',
  styleUrls: ['./add-product-modal-window.component.scss']
})
export class AddProductModalWindowComponent implements OnInit {

  shortDays: string[] = DAYS_SHORT;
  customerForm = new FormGroup({
    customerNo: new FormControl(),
    name: new FormControl()
  });

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
}
