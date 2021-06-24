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
    return this.http.post('http://localhost:3000/customers', customer);
  }

  editCustomer(customer, id){
    return this.http.put( 'http://localhost:3000/customers/' + id, customer);
  }

  getCatalog(){
    console.log('it works');
    return this.http.get('http://localhost:3000/products');
  }

  addProduct(product: IProduct){
    return this.http.post('http://localhost:3000/products', product);
  }

  deleteProduct(productId: number){
    return this.http.delete('http://localhost:3000/products/' + productId);
  }

  getOrders(){
    return this.http.get('http://localhost:3000/orders');
  }

  changeOrdersStatus(element, id){
    element.isConfirmedStatus=!element.isConfirmedStatus;
    return this.http.put('http://localhost:3000/orders/' + id, element)
  }
}
