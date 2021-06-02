import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomerpickerComponent } from './customerpicker/customerpicker.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { StatusComponent } from './status/status.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { OrdersReducer } from './store/orders/orders.reducer';
import { environment } from '../environments/environment';
import { MatTooltipModule } from '@angular/material/tooltip';
import { dateFormatPipe } from './shared/pipes/date.pipe';
import { StoreModule } from '@ngrx/store';
import { OrdersEffect } from './store/orders/orders.effects';
import { EffectsModule } from '@ngrx/effects';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CatalogComponent } from './catalog/catalog.component';
import { PageTitleComponent } from './shared/components/page-title/page-title.component';
import { SearchFieldComponent } from './shared/components/search-field/search-field.component';
import { AddComponent } from './shared/components/add/add.component';
import { CustomersReducer } from './store/customers/customers.reducer';
import { PaginatorComponent } from './paginator/paginator.component';
import { AddCustomerModalWindowComponent } from './add-customer-modal-window/add-customer-modal-window.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddProductModalWindowComponent } from './add-product-modal-window/add-product-modal-window.component';


const appRoutes: Routes = [
  { path: '', component: OrdersTableComponent },
  { path: 'orders', component: OrdersTableComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'catalog', component: CatalogComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    OrdersTableComponent,
    DatepickerComponent,
    CustomerpickerComponent,
    StatusComponent,
    dateFormatPipe,
    NavigationComponent,
    CustomersComponent,
    CatalogComponent,
    PageTitleComponent,
    SearchFieldComponent,
    AddComponent,
    PaginatorComponent,
    AddCustomerModalWindowComponent,
    AddProductModalWindowComponent
  ],
  imports: [
    StoreModule.forRoot({ ordersReducer: OrdersReducer, customersReducer: CustomersReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([OrdersEffect]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    NgSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule.forRoot(appRoutes),
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
