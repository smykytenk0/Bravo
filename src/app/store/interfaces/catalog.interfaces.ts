export interface IProduct {
  productCode: string,
  name: string,
  units: {
    unit: string,
    price: number
  }[],
  availability: string,
}

export interface Catalog {
  products: IProduct[]
}
