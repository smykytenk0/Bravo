import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-menu',
  templateUrl: './small-menu.component.html',
  styleUrls: ['./small-menu.component.scss']
})
export class SmallMenuComponent {
  @Input() role: number;
}
