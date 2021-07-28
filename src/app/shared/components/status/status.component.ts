import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { HttpService } from '../../services/http.service';
import { roleSelector } from '../../../store/auth/auth.reducer';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy {
  @Input() element;
  @Output() status: EventEmitter<string> = new EventEmitter();
  role: string;
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private store: Store,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.store.select(roleSelector).pipe(takeUntil(this.unsubscribeAll)).subscribe(data => this.role = data);
  }

  confirmStatus() {
    this.status.emit('Confirmed');
    this.httpService.changeOrdersStatus(this.element, 'Confirmed').subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
