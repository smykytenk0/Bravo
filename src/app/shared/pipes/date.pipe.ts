import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'dateFormat'
})

export class dateFormatPipe implements PipeTransform{
  transform(value: Date, ...args): any {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dateToday = new Date();
    let dateTomorrow = new Date(dateToday.getTime() + 24 * 60 * 60 * 1000);
    let dateYesterday = new Date(dateToday.getTime() - 24 * 60 * 60 * 1000);
    let dayStatus;
    let hours = value.getHours();
    let minutes = value.getMinutes();
    if(value.getFullYear() == dateToday.getFullYear() && value.getMonth() == dateToday.getMonth() && value.getDay() == dateToday.getDay()){
      dayStatus = "Today"
    }
    else if((value.getFullYear() == dateYesterday.getFullYear() && value.getMonth() == dateYesterday.getMonth() && value.getDay() == dateYesterday.getDay())){
      dayStatus = "Yesterday"
    }
    else if((value.getFullYear() == dateTomorrow.getFullYear() && value.getMonth() == dateTomorrow.getMonth() && value.getDay() == dateTomorrow.getDay())){
      dayStatus = "Tomorrow"
    }
    else{
      dayStatus = days[value.getDay()] + ', ' + value.getDate() + ' ' + months[value.getMonth()-1] + ' ' + value.getFullYear()
    }
    return dayStatus + ', ' + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes);
  }
}
