export interface OrdersData {
  orderNo: number,
  customer: string,
  customerNo: string,
  items: Item[],
  notes: string,
  ordered: Date,
  reqDelivery: Date,
  isConfirmedStatus: boolean,
  address: Address,
}

export interface IOrders {
  ordersData: OrdersData[]
  filteredCustomers: string[];
  filteredOrdersData: OrdersData[];
  rangeStartDate: Date;
  rangeEndDate: Date;
}

export interface Item {
  productCode: string,
  product: string
  unit:string,
  quantity: number
}

export interface Address {
  street: string,
  city: string
}
