export const getEnumKeys = (enumObj: any): string[] => {
  return Object.keys(enumObj)
    .filter((item) => !isNaN(Number(item)))
    .map((item) => enumObj[item]);
};

export const getTotalOrderPrice = (order: object): number => {
  let totalCount: number = 0;
  for(let i of order['items']){
    totalCount += i.activeUnit.price * i.quantity
  }
  return totalCount;
};
