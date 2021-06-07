export interface IUnit {
  unit: string,
  price: number
}

export interface IProduct {
  productCode: string,
  name: string,
  mainUnit: IUnit,
  anotherUnits?: IUnit[],
  availability: string,
}

export interface Catalog {
  products: IProduct[]
}
