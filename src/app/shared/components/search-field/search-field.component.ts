import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
  @Input()placeholder;

  @Output() currentSearch: EventEmitter<string> = new EventEmitter();

  emitCurrentSearch(value: any) {
    this.currentSearch.emit(value);
  }
}
