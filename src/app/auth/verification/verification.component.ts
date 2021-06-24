import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  verificationForm: FormGroup;

  constructor(private route: Router) { }

  verificationFormInit(){
    this.verificationForm = new FormGroup({
      firstNumbers: new FormControl(),
      anotherNumbers: new FormControl()
    })
  }

  enterVerificationForm(){
    this.route.navigate(['orders']);
  }

  ngOnInit(): void {
    this.verificationFormInit();
  }

  handleChange(v) {
    if (this.verificationForm.value.firstNumbers.length == 3) {
      document.getElementById('anotherNumbers').focus();
      if (this.verificationForm.value.anotherNumbers.length == 3) {
        this.enterVerificationForm()
      }
    }
  }
}
