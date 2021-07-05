import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { emailSelector } from '../../store/auth/auth.reducer';
import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  verificationForm: FormGroup;
  currentEmail: string;
  currentRole: string;

  constructor(private route: Router,
              private store: Store, private httpService: HttpService) {
  }

  verificationFormInit() {
    this.verificationForm = new FormGroup({
      firstNumbers: new FormControl(),
      anotherNumbers: new FormControl()
    })
  }

  enterVerificationForm() {
    console.log(this.currentRole);
    switch(this.currentRole){
      case 'admin':
        this.route.navigate(['/tables/orders']);
        break;
      case 'customer':
        this.route.navigate(['/tables/customers']);
        break;
      default:
        this.route.navigate(['/tables/catalog']);
        break;
    }
  }

  ngOnInit(): void {
    this.verificationFormInit();
    this.store.select(emailSelector).subscribe(data => this.currentEmail = data);
    this.httpService.getCustomers({ email: this.currentEmail }).subscribe(data => {
      Object.keys(data).length? this.currentRole = data[0].role : this.currentRole = 'none';
      console.log(this.currentRole);
    });
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
