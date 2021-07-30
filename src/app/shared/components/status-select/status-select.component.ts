import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OrderActionsEnum } from '../../enums/orderActions.enum';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnInit {
  @Output() changeStatus: EventEmitter<string> = new EventEmitter();
  status: string;
  statusArray: string[] = ['New', 'Confirmed', 'Canceled', 'On the way', 'Delivered', 'Completed'];

  constructor() {
  }

  ngOnInit(): void {
  }

  enterStatusFilter() {
    this.changeStatus.emit(OrderActionsEnum[this.status]);
  }
}
