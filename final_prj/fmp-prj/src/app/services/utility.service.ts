import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetOptions, Preferences, SetOptions } from '@capacitor/preferences';

const USER_ACCOUNT_ID_KEY_NAME = "accountId";
const LOCALE_STRING: string = 'pt-pt';
const WEEK_DAYS: string[] = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb" ];

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private router: Router) { }

  /**
   * CACHE METHODS
   */

  saveAccountIdInCache(id: string): void {
    let data: SetOptions = { key: USER_ACCOUNT_ID_KEY_NAME, value: id };
    Preferences.set(data);
  }

  async readAccountIdFromCache(): Promise<string | null> {
    let getOptions: GetOptions = { key: USER_ACCOUNT_ID_KEY_NAME };
    return Preferences.get(getOptions).then(e => e.value);
  }

  clearCache(): void {
    Preferences.clear();
  }

  /**
   * DATE METHODS
   */

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

  /**
   * ROUTING METHODS
   */

  redirectTo(page: string): void {
    this.router.navigate([page]);
  };
}

class Day {
  public name: string = "";
  public date: Date = new Date();
}