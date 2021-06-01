import { DAY_IN_MS, DAYS_SHORT, MONTHS_SHORT } from '../constants';

export function getDayStatus(value: Date) {
  if (isSameDate(value, new Date())) {
    return 'Today';
  }
  if (isSameDate(value, new Date(new Date().getTime() + DAY_IN_MS))) {
    return 'Yesterday';
  }
  if (isSameDate(value, new Date(new Date().getTime() - DAY_IN_MS))) {
    return 'Tomorrow';
  }
  return `${DAYS_SHORT[value.getDay()]}, ${value.getDate()} ${MONTHS_SHORT[value.getMonth() - 1]} ${value.getFullYear()}`;
}

export function getPreZeroNumber(value: number) {
  return value < 10 ? `0${value}` : value;
}

function isSameDate(value:Date, compare:Date){
  return value.getFullYear() == compare.getFullYear() &&
    value.getMonth() == compare.getMonth() &&
    value.getDay() == compare.getDay();
}
