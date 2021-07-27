export const getEnumKeys = (enumObj: any): string[] => {
  return Object.keys(enumObj)
    .filter((item) => !isNaN(Number(item)))
    .map((item) => enumObj[item]);
};
