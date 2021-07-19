import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnInit {
  @Output() currentStatus: EventEmitter<string> = new EventEmitter();
  @Output() confirmedStatus: EventEmitter<boolean> = new EventEmitter();
  status: string;
  statusArray: string[] = ['New', 'Confirmed', 'Canceled', 'On way', 'Delivered', 'Completed'];

  constructor() {
  }

  ngOnInit(): void {
  }

  enterStatusFilter() {
    this.currentStatus.emit(this.status);
    this.confirmedStatus.emit(true);
  }
}
