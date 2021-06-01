import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  title: string = 'Customers';
  placeholder: string = "Customer No, Name, Address...";
  addBtnText: string = "Add Customer"
}
