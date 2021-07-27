import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatusActionsEnum } from '../shared/enums/statusActions.enum';
import { getEnumKeys } from '../shared/services/helper';
import { OrderActionsEnum } from '../shared/enums/orderActions.enum';

@Component({
  selector: 'app-status-actions',
  templateUrl: './status-actions.component.html',
  styleUrls: ['./status-actions.component.scss']
})
export class StatusActionsComponent implements OnInit {
  @Input() role: string;
  @Input() status: string;
  @Output() changedStatus: EventEmitter<number> = new EventEmitter();
  adminStatusOptions: string[];
  customerStatusOptions: string[];
  possibleStatuses: string[];
  statusActions: string[];

  constructor() {
  }

  ngOnInit(): void {
    this.possibleStatuses = getEnumKeys(OrderActionsEnum);
    this.statusActions = getEnumKeys(StatusActionsEnum);
    switch (this.status) {
      case(this.possibleStatuses[0]):
        this.adminStatusOptions = [this.statusActions[0], this.statusActions[1]];
        break;
      case(this.possibleStatuses[1]):
        this.adminStatusOptions = [];
        this.customerStatusOptions = [];
        break;
      case(this.possibleStatuses[2]):
        this.adminStatusOptions = [this.statusActions[2]];
        break;
      case(this.possibleStatuses[3]):
        this.adminStatusOptions = [this.statusActions[3]];
        break;
      case(this.possibleStatuses[4]):
        this.customerStatusOptions = [this.statusActions[4]];
    }
  }

  onStatusActivated(option) {
    switch (option) {
      case(this.statusActions[0]):
        this.changedStatus.emit(OrderActionsEnum.Confirmed);
        break;
      case(this.statusActions[1]):
        this.changedStatus.emit(OrderActionsEnum.Canceled);
        break;
      case(this.statusActions[2]):
        this.changedStatus.emit(OrderActionsEnum['On the way']);
        break;
      case(this.statusActions[3]):
        this.changedStatus.emit(OrderActionsEnum.Delivered);
        break;
      case(this.statusActions[4]):
        this.changedStatus.emit(OrderActionsEnum.Completed);
        break;
    }
  }
}
