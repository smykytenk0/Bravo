import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { roleSelector } from '../../../store/auth/auth.reducer';

@Component({
  selector: 'app-small-menu',
  templateUrl: './small-menu.component.html',
  styleUrls: ['./small-menu.component.scss']
})
export class SmallMenuComponent implements OnInit{
  @Input() role: string;

  ngOnInit(): void {
    if(this.role =='customer'){
      document.getElementById('customers').className = 'hidden';
    }
  }
}
