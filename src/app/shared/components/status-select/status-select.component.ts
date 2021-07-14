import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OrdersActions } from '../../../store/orders/orders.actions';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnInit {
  statusArray: string[] = ['Confirmed', 'Not confirmed', 'Both'];
  constructor(private store: Store) { }

  @Output() currentStatus: EventEmitter<string> = new EventEmitter();
  status: string;

  ngOnInit(): void {
  }

  enterStatusFilter() {
    this.currentStatus.emit(this.status);
  }
}
