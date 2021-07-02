import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private route: Router,
              private store: Store) {
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  login() {
    this.store.dispatch(AuthActions.enterEmail({email: this.loginForm.value.email}));
    this.route.navigate(['auth/verification'])
  }

  handleChange(event) {
    (this.loginForm.valid) ? document.getElementById('loginFormInput').className = 'loginFormInput valid' :
      (this.loginForm.value.email.length > 0) ? document.getElementById('loginFormInput').className = 'loginFormInput invalid' :
        document.getElementById('loginFormInput').className = 'loginFormInput'
  }
}
