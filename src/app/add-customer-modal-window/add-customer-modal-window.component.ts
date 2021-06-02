import { Component, OnInit } from '@angular/core';
import { DAYS_SHORT } from '../shared/constants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer-modal-window',
  templateUrl: './add-customer-modal-window.component.html',
  styleUrls: ['./add-customer-modal-window.component.scss']
})
export class AddCustomerModalWindowComponent implements OnInit {
  shortDays: string[] = DAYS_SHORT;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
