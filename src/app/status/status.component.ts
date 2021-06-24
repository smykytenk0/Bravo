import { Component, Input, OnInit } from '@angular/core';
import { OrdersData } from '../store/interfaces/orders.interfaces';
import { Store } from '@ngrx/store';
import { OrdersActions } from '../store/orders/orders.actions';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit{
  isConfirmedStatus: boolean;
  @Input() element;

  constructor(private store: Store,
              private httpService: HttpService) {
  }
  ngOnInit(): void {
    this.isConfirmedStatus = this.element.isConfirmedStatus;
  }

  changeStatus() {
    this.httpService.changeOrdersStatus(this.element, this.element.id).subscribe();
    this.store.dispatch(OrdersActions.changeStatus({order: this.element}))
  }
}
