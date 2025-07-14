import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetOptions, Preferences, SetOptions } from '@capacitor/preferences';
import { ToastComponent, ToastPosition } from '../shared/toast/toast.component';
import { ItemReorderEventDetail, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { LoadingComponent } from '../shared/loading/loading.component';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Recepy } from '../models/recepy';
import { MealPlan, MealPlanEntry } from '../models/meal-plan';
import { App } from '@capacitor/app';

const LOCALE_STRING: string = 'pt-pt';
const WEEK_DAYS: string[] = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb" ];
const TOAST_DEFAULT_DURATION: number = 1500;
const LOADING_DEFAULT_DURATION: number = 3000;
const IMAGE_QUALITY: number = 90;
const DEFAULT_NOTIFICATION_ID: number = 1;

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

    toast.presentToast(msg, duration, position);
  }

  /**
   * LOADING METHODS
   */
  openLoadingWithDuration(msg: string, options?: { duration?: number}): void {
    const loadingController = new LoadingController();
    const loading = new LoadingComponent(loadingController);

    let duration = options?.duration ?? LOADING_DEFAULT_DURATION;

    loading.presentWithDuration(msg, duration);
  }

  createLoading() {
    const loadingController = new LoadingController();
    const loading = new LoadingComponent(loadingController);
    return loading;
  }

  /**
   * DATE METHODS
   */

  getCurrentWeekDays(): Day[] {
    let week: Day[] = [];
    
    let today: Date = new Date();
    for (let i = 0; i <= 6; i++) {
      let todayDay = this.modulo(today.getDay()-1, 7);
      let first: number = today.getDate() - todayDay + i;
      
      let resultDate: Date = new Date(today.setDate(first));
      let resultDay: number = this.modulo(resultDate.getDay(), 7);
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

  timestampToDate(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }

  dateToTimestamp(date: Date): Timestamp {
    return Timestamp.fromDate(date);
  }

  /**
   * ROUTING METHODS
   */
  redirectTo(page: string): void {
    this.router.navigate([page]);
  };

  exitApp() {
    App.exitApp();
  }

  /**
   * CAMERA METHODS
   */
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: IMAGE_QUALITY,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    let data = image.dataUrl;
    if (!data) return;

    // Cast raw image data to Blob 
    let blob = await fetch(data).then(r => r.blob());

    return { img: data, blob: blob };
  };

  /**
   * LOCAL NOTIFICATIONS METHODS
   */
  async requestLocalNotificationPermission() {
    await LocalNotifications.requestPermissions();
  }

  async schduleBasicLocalNotification(title: string, body: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: DEFAULT_NOTIFICATION_ID
        }
      ]
    });
  }

  /**
   * MEAL PLAN RELATED METHODS
   */
  generateNewMealPlan(recepies: Recepy[]): MealPlan {
    let newPlan: MealPlanEntry[] = [];
    
    let currentWeekDays = this.getCurrentWeekDays();

    currentWeekDays.forEach(weekDay => {
      let planEntry: MealPlanEntry = {
        date: this.dateToTimestamp(weekDay.date),
        recepies: this.pickRandom(recepies, 2)
      };
      newPlan.push(planEntry);
    });

    return new MealPlan(newPlan);
  }

  /**
   * MISC METHODS
   */
  modulo(value: number, n: number): number {
    return ((value % n) + n) % n;
  }

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

  generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  pickRandom(array: any[], n: number = 1) {
    if (n > array.length) {
      n = array.length;
    }

    let result: any[] = [];

    let tmpArray: any[] = [...array];
    for (let i = 0; i < n; i++) {
      tmpArray = this.shuffle(tmpArray);
      result.push(tmpArray[0]);
      tmpArray.reverse();
      tmpArray.pop();
    }

    return result;
  }

  shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }

    return array;
  };
}

class Day {
  public name: string = "";
  public date: Date = new Date();
}