import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomerData } from '../../store/interfaces/customers.interfacers';
import { IProduct } from '../../store/interfaces/catalog.interfaces';
import { tap } from 'rxjs/operators';

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

  getCustomerById(order: any) {
    this.http.get(`http://localhost:3000/customers?id=${ order.customerId }`).subscribe(data => order.customerData = data)
  }

  getProductById(order: any) {
    let productReq = 'http://localhost:3000/products?';
    for (let i of order.items){
      productReq+=`&id=${i.productId}`
    }
    this.http.get(productReq).subscribe(data => order.products = data);
  }

  getOrders(params = ''){
    console.log(`http://localhost:3000/orders?${params}`);
    return this.http.get(`http://localhost:3000/orders?${params}`).pipe(tap(item => {
      for (let i in item) {
        this.getCustomerById(item[i]);
        this.getProductById(item[i]);
      }
    }));
  }

  changeOrdersStatus(element, id){
    element.isConfirmedStatus=!element.isConfirmedStatus;
    return this.http.put('http://localhost:3000/orders/' + id, element)
  }

  convertSelectedCustomers(selectedCustomers: string[]){
    let customerSelect = '';
    let customersId = [];
    for (let customerName of selectedCustomers){
      customerSelect += `name=${customerName}&`
    }
    this.http.get(`http://localhost:3000/customers?${customerSelect}`).subscribe( data => {
      for (let item in data){
        customersId.push(data[item].id);
        console.log(customersId);
      }
    });
    console.log(customersId)
  }
}
