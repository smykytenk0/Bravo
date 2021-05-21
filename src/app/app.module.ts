import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
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
import {NgSelectModule} from "@ng-select/ng-select";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    AppComponent,
    OrdersTableComponent,
    DatepickerComponent,
    CustomerpickerComponent,
    StatusComponent,
  ],
  imports: [
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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
