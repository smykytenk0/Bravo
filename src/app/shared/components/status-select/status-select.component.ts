import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OrdersActions } from '../../../store/orders/orders.actions';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnInit {
  status: string;
  statusArray: string[] = ['Confirmed', 'Not confirmed', 'Both'];
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  enterStatusFilter() {
    console.log(this.status);
    this.store.dispatch(OrdersActions.filterStatus({status: this.status}))
  }
}
