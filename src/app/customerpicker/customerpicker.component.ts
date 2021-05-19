import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-customerpicker',
  templateUrl: './customerpicker.component.html',
  styleUrls: ['./customerpicker.component.scss']
})
export class CustomerpickerComponent  {
  @Input() customers: any;
  selectedValue: string;
}
