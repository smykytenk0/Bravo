import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private route: Router) {
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
    this.route.navigate(['verification'])
  }

  handleChange(event) {
    (this.loginForm.valid) ? document.getElementById('loginFormInput').className = 'loginFormInput valid' :
      (this.loginForm.value.email.length > 0) ? document.getElementById('loginFormInput').className = 'loginFormInput invalid' :
        document.getElementById('loginFormInput').className = 'loginFormInput'
  }
}
