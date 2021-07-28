import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { OrdersReducer } from './store/orders/orders.reducer';
import { environment } from '../environments/environment';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { OrdersEffect } from './store/orders/orders.effects';
import { EffectsModule } from '@ngrx/effects';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomersReducer } from './store/customers/customers.reducer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CatalogReducer } from './store/catalog/catalog.reducer';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthReducer } from './store/auth/auth.reducer';
import { AddOrderModalWindowComponent } from './shared/components/add-order-modal-window/add-order-modal-window.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidenavComponent,
    AddOrderModalWindowComponent,
  ],
  imports: [
    StoreModule.forRoot({
      ordersReducer: OrdersReducer,
      customersReducer: CustomersReducer,
      catalogReducer: CatalogReducer,
      authReducer: AuthReducer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([OrdersEffect]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatTooltipModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
