import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PrintComponent } from './print/print.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'tables', canActivate: [AuthGuard], component: SidenavComponent, children: [
      { path: '', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) }
    ]
  },
  { path: 'print', component: PrintComponent },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
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
