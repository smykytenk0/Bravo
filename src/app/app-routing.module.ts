import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { PrintComponent } from './print/print.component';
import { CustomersComponent } from './customers/customers.component';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
