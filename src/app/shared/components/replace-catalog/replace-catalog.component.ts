import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ReplaceCatalogModalComponent } from '../replace-catalog-modal/replace-catalog-modal.component';

@Component({
  selector: 'app-replace-catalog',
  templateUrl: './replace-catalog.component.html',
  styleUrls: ['./replace-catalog.component.scss']
})
export class ReplaceCatalogComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openCatalogReplaceModal() {
    this.dialog.open(ReplaceCatalogModalComponent)
  }
}
