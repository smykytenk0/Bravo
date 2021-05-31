export interface OrdersData {
  orderNo: number,
  customer: string,
  customerNo: number,
  items: object[],
  notes: string,
  ordered: Date,
  reqDelivery: Date,
  status: string,
  address: string
}

export interface IOrders {
  ordersData: OrdersData[]
  filteredCustomers: string[];
  filteredOrdersData: OrdersData[];
  rangeStartDate: Date;
  rangeEndDate: Date;
}
