import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetOptions, Preferences, SetOptions } from '@capacitor/preferences';
import { ToastComponent, ToastPosition } from '../shared/toast/toast.component';
import { ItemReorderEventDetail, ToastController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

const LOCALE_STRING: string = 'pt-pt';
const WEEK_DAYS: string[] = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb" ];
const TOAST_DEFAULT_DURATION: number = 1500;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private router: Router) { }

  /**
   * TOAST METHODS
   */
  openToast(msg: string, options?: { duration?: number, position?: ToastPosition}): void {
    let toastController: ToastController = new ToastController();
    let toast: ToastComponent = new ToastComponent(toastController);

    let duration: number = options?.duration ?? TOAST_DEFAULT_DURATION;
    let position: ToastPosition = options?.position ?? ToastPosition.BOTTOM;

    console.log("msg: ", msg);
    console.log("duration: ", duration);
    console.log("position: ", position);

    toast.presentToast(msg, duration, position);
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

  timestampToDate(timestamp: Timestamp) {
    return new Date(timestamp.seconds * 1000);
  }

  /**
   * ROUTING METHODS
   */

  redirectTo(page: string): void {
    this.router.navigate([page]);
  };

  /**
   * MISC METHODS
   */
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  sanitizeString(str: string) {
    return str.trim().replace(/ +/g, " ");
  }
}

class Day {
  public name: string = "";
  public date: Date = new Date();
}