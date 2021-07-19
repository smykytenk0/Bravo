import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { roleSelector } from '../store/auth/auth.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  navIsOpened: boolean = true;
  pageName: string = '';
  role: string;

  @ViewChild('drawer') sidenav: MatSidenav;
  constructor(public route: Router,
              private store: Store) {

  }

  ngOnInit(): void {
    this.store.select(roleSelector).subscribe(data => this.role = data)
  }
}
