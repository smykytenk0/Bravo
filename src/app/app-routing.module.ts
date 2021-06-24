import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OrdersTableComponent } from './tables/orders-table/orders-table.component';
import { PrintComponent } from './print/print.component';
import { CustomersComponent } from './tables/customers/customers.component';
import { CatalogComponent } from './tables/catalog/catalog.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {
    path: 'tables', component: SidenavComponent, children: [
      { path: 'orders', component: OrdersTableComponent, children: [{ path: 'print', component: PrintComponent }] },
      { path: 'customers', component: CustomersComponent },
      { path: 'catalog', component: CatalogComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
