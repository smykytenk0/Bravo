import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomerData } from '../../store/interfaces/customers.interfacers';
import { IProduct } from '../../store/interfaces/catalog.interfaces';

@Injectable({providedIn:'root'})
export class HttpService{
  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<any>{
    return this.http.get('http://localhost:3000/customers');
  }

  addCustomer(customer: ICustomerData){
    console.log(customer);
    return this.http.post('http://localhost:3000/customers', customer);
  }

  getCatalog(){
    return this.http.get('http://localhost:3000/products');
  }

  addProduct(product: IProduct){
    console.log(product);
    return this.http.post('http://localhost:3000/products', product);
  }
}
