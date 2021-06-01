import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule , NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { CustomerpickerComponent } from './customerpicker/customerpicker.component';
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { StatusComponent } from './status/status.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatMenuModule } from "@angular/material/menu";
import {OrdersReducer} from "./store/orders.reducer";
import {environment} from "../environments/environment";
import {MatTooltipModule} from "@angular/material/tooltip";
import {dateFormatPipe} from "./shared/pipes/date.pipe";
import {StoreModule} from "@ngrx/store";
import { OrdersEffect } from './store/orders.effects';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
    OrdersTableComponent,
    DatepickerComponent,
    CustomerpickerComponent,
    StatusComponent,
    dateFormatPipe
  ],
    imports: [
        StoreModule.forRoot({ordersReducer: OrdersReducer}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([ OrdersEffect ]),
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
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
