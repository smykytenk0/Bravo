import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})

export class PrintComponent implements OnInit {
  printInfo = history.state;

  constructor() {
  }

  //TODO: fix this component

  ngOnInit(): void {
    console.log(this.printInfo)
  }

}
