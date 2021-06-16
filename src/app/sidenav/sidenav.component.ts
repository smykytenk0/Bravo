import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
  navIsOpened: boolean = true;
  pageName: string = '';

  @ViewChild('drawer') sidenav: MatSidenav;
  constructor(public route: Router) {

  }

  ngOnInit(): void {
  }
}
