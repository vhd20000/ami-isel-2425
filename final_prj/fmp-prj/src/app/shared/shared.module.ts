import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as Ionic from '@ionic/angular';

import { NavbarComponent } from './navbar/navbar.component';
import { ComingSoonNoticeComponent } from './coming-soon-notice/coming-soon-notice.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MealPlanCardComponent } from './meal-plan-card/meal-plan-card.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    Ionic.IonicModule
  ],
  declarations: [
    NavbarComponent,
    ComingSoonNoticeComponent,
    CalendarComponent,
    MealPlanCardComponent,
    PopupComponent
  ],
  exports: [
    Ionic.IonFab,
    Ionic.IonFabButton,
    Ionic.IonIcon,
    Ionic.IonButtons,
    Ionic.IonContent,
    Ionic.IonHeader,
    Ionic.IonMenu,
    Ionic.IonMenuButton,
    Ionic.IonTitle,
    Ionic.IonToolbar,
    NavbarComponent,
    ComingSoonNoticeComponent,
    CalendarComponent,
    MealPlanCardComponent,
    PopupComponent
  ]
})
export class SharedModule { }
