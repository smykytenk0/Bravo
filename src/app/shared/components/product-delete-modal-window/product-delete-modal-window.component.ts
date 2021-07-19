import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-product-delete-modal-window',
  templateUrl: './product-delete-modal-window.component.html',
  styleUrls: ['./product-delete-modal-window.component.scss']
})
export class ProductDeleteModalWindowComponent {

  constructor(private store: Store,
              @Inject(MAT_DIALOG_DATA) private data,
              private httpService: HttpService) {
  }

  deleteProduct() {
    this.httpService.deleteProduct(this.data.id).subscribe();
  }
}
