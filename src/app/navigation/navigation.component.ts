import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  @Input() navIsOpened: boolean = true;
  @Input() role: string;

  ngOnInit(): void {
    console.log(this.role);
    if(this.role =='customer'){
      console.log('hidden');
      document.getElementById('customers').className = 'hidden';
    }
  }
}
