import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PrintComponent } from './print/print.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {
    path: 'tables', component: SidenavComponent, children: [
      { path: '', loadChildren: () => import('./tables/tables.module').then( m => m.TablesModule)}
    ]
  },
  {path: 'print', component: PrintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  declarations: [
    PrintComponent
  ],
  exports: [RouterModule, PrintComponent]
})
export class AppRoutingModule {
}
