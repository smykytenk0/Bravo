import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;

  public toggle(): void {
    this.sidenav.toggle();
  }
}
