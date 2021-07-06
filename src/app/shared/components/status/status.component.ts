import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../../services/http.service';

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
    this.httpService.changeOrdersStatus(this.element).subscribe();
  }
}
