import { Component, Input, OnInit } from '@angular/core';
import { OrdersData } from '../store/interfaces/orders.interfaces';
import { Store } from '@ngrx/store';
import { OrdersActions } from '../store/orders/orders.actions';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit{
  isConfirmedStatus: boolean;
  @Input() element: OrdersData;

  constructor(private store: Store) {
  }
  ngOnInit(): void {
    this.isConfirmedStatus = this.element.isConfirmedStatus;
  }

  changeStatus() {
    console.log(this.element);
    this.store.dispatch(OrdersActions.changeStatus({order: this.element}))
  }
}
