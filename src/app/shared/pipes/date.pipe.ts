import { Pipe, PipeTransform } from '@angular/core';
import { getDayStatus, getPreZeroNumber } from '../utils';

@Pipe({
  name: 'dateFormat'
})

export class dateFormatPipe implements PipeTransform {
  transform(value: Date, ...args): any {
    const status = getDayStatus(value);
    return `${status},${getPreZeroNumber(value.getHours())}:${getPreZeroNumber(value.getMinutes())}`;
  }
}
