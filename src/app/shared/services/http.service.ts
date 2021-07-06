import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomerData } from '../../store/interfaces/customers.interfacers';
import { IProduct } from '../../store/interfaces/catalog.interfaces';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {
  }

  getCustomers(params = {}): Observable<any> {
    return this.http.get('http://localhost:3000/customers', {params: params});
  }

  addCustomer(customer: ICustomerData) {
    return this.http.post('http://localhost:3000/customers', customer);
  }

  editCustomer(customer, id) {
    return this.http.put('http://localhost:3000/customers/' + id, customer);
  }

  getCatalog() {
    return this.http.get('http://localhost:3000/products');
  }

  addProduct(product: IProduct) {
    return this.http.post('http://localhost:3000/products', product);
  }

  deleteProduct(productId: number) {
    return this.http.delete('http://localhost:3000/products/' + productId);
  }

  getCustomerById(order: any) {
    this.http.get(`http://localhost:3000/customers?id=${ order.customerId }`).subscribe(data => order.customerData = data)
  }

  getProductById(order: any) {
    let productReq = 'http://localhost:3000/products?';
    for (let i of order.items) {
      productReq += `&id=${ i.productId }`
    }
    this.http.get(productReq).subscribe(data => order.products = data);
  }

  convertSelectedCustomers(selectedCustomers: string[]) {
    return this.http.get(`http://localhost:3000/customers`, { params: { name: selectedCustomers } });
  }

  getOrders(params = {}) {
    return this.http.get(`http://localhost:3000/orders`, {params: params}).pipe(tap(item => {
      for (let i in item) {
        this.getCustomerById(item[i]);
        this.getProductById(item[i]);
      }
    }));
  }

  changeOrdersStatus(element) {
    element.isConfirmedStatus = !element.isConfirmedStatus;
    return this.http.patch('http://localhost:3000/orders/' + element.id, element)
  }
}
