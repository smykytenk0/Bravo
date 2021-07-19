import { NgModule } from '@angular/core';
import { AddComponent } from './components/add/add.component';
import { AddCustomerModalWindowComponent } from './components/add-customer-modal-window/add-customer-modal-window.component';
import { AddProductModalWindowComponent } from './components/add-product-modal-window/add-product-modal-window.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomerpickerComponent } from './components/customerpicker/customerpicker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { EmptyTableComponent } from './components/empty-table/empty-table.component';
import { ProductDeleteModalWindowComponent } from './components/product-delete-modal-window/product-delete-modal-window.component';
import { ProgressComponent } from './components/progress/progress.component';
import { ReplaceCatalogComponent } from './components/replace-catalog/replace-catalog.component';
import { ReplaceCatalogModalComponent } from './components/replace-catalog-modal/replace-catalog-modal.component';
import { DndDirective } from './directives/dnd.directive';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { SmallMenuComponent } from './components/small-menu/small-menu.component';
import { StatusComponent } from './components/status/status.component';
import { StatusSelectComponent } from './components/status-select/status-select.component';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { SuccessfulProductAddingComponent } from './components/successful-product-adding/successful-product-adding.component';
import { StatusActionsComponent } from '../status-actions/status-actions.component';

@NgModule({
  declarations: [
    AddComponent,
    AddCustomerModalWindowComponent,
    AddProductModalWindowComponent,
    DeleteButtonComponent,
    CustomerpickerComponent,
    EmptyTableComponent,
    ProductDeleteModalWindowComponent,
    ProgressComponent,
    ReplaceCatalogComponent,
    ReplaceCatalogModalComponent,
    DndDirective,
    SearchFieldComponent,
    SmallMenuComponent,
    StatusComponent,
    StatusSelectComponent,
    SuccessfulProductAddingComponent,
    StatusActionsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatChipsModule,
    CommonModule,
    MatRadioModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    AddComponent,
    AddCustomerModalWindowComponent,
    AddProductModalWindowComponent,
    DeleteButtonComponent,
    CustomerpickerComponent,
    EmptyTableComponent,
    ProductDeleteModalWindowComponent,
    ProgressComponent,
    ReplaceCatalogComponent,
    ReplaceCatalogModalComponent,
    SearchFieldComponent,
    SmallMenuComponent,
    StatusComponent,
    StatusSelectComponent,
    SuccessfulProductAddingComponent,
    StatusActionsComponent,
  ]
})

export class SharedModule {
}
