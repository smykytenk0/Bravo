export interface ICustomerData {
  customerNo: string,
  name: string,
  address: string,
  deliveryDays: string[];
}

export interface ICustomers {
  customers: ICustomerData[];
}
