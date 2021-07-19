import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthActions } from '../../store/auth/auth.actions';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  loginForm: FormGroup;

  constructor(private route: Router,
              private store: Store,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  login(): void {
    /*let emailSender = require('../../shared/services/emailSender.service');
    emailSender.send();*/
    this.httpService.getCustomers({ email: this.loginForm.value.email }).pipe(takeUntil(this.unsubscribeAll)).subscribe(data => {
      if (Object.keys(data).length) {
        this.store.dispatch(AuthActions.enterEmail({ email: this.loginForm.value.email }));
        this.route.navigate(['auth/verification']);
        this.store.dispatch(AuthActions.login());
      } else {
        document.getElementById('hint').innerText = 'Your password is incorrect. Try once more please';
        document.getElementById('hint').className = 'hint invalidText';
        document.getElementById('loginFormInput').className = 'loginFormInput invalid';
      }
    })
  }

  handleChange(): void {
    (this.loginForm.valid) ? document.getElementById('loginFormInput').className = 'loginFormInput valid' :
      (this.loginForm.value.email.length > 0) ? document.getElementById('loginFormInput').className = 'loginFormInput invalid' :
        document.getElementById('loginFormInput').className = 'loginFormInput'
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
