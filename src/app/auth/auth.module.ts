import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { VerificationComponent } from './verification/verification.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'verification', component: VerificationComponent }
];

@NgModule({
  declarations: [
    LoginFormComponent,
    VerificationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})

export class AuthModule{}
