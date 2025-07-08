import { Injectable } from '@angular/core';

const LOCALE_STRING: string = 'pt-pt';
const WEEK_DAYS: string[] = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb" ];

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getCurrentWeekDays(): Day[] {
    let week: Day[] = [];
    
    let today: Date = new Date();
    for (let i = 1; i <= 7; i++) {
      let first: number = today.getDate() - today.getDay() + i;
      
      let todayDay: number = today.getDay();
      if (todayDay === 0){
        first = todayDay - 6;
      }

      let resultDate: Date = new Date(today.setDate(first));
      let resultDay: number = resultDate.getDay();
      let day: Day = {
        name: WEEK_DAYS[resultDay],
        date: resultDate
      } as Day;

      week.push(day);
    };

    return week;
  }

  getCurrentWeekMonthsSpan(): string[] {
    let months: string[] = [];
    
    let week: Day[] = this.getCurrentWeekDays();
    week.forEach(e => {
      let monthName = e.date.toLocaleString(LOCALE_STRING, { month: 'long' });
      monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      if (!months.includes(monthName)) {
        months.push(monthName);
      }
    });

    return months;
  }

  getDateDay(date: Date, size: 'short' | 'long' = 'short'): string {
    let dateDay = date.toLocaleString(LOCALE_STRING, { weekday: size });
    return dateDay.charAt(0).toUpperCase() + dateDay.slice(1);
  }
}

class Day {
  public name: string = "";
  public date: Date = new Date();
}