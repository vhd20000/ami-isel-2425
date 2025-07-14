import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as Ionic from '@ionic/angular';

import { NavbarComponent } from './navbar/navbar.component';
import { ComingSoonNoticeComponent } from './coming-soon-notice/coming-soon-notice.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MealPlanCardComponent } from './meal-plan-card/meal-plan-card.component';
import { PopupComponent } from './popup/popup.component';
import { ToastComponent } from './toast/toast.component';
import { RecepyCardComponent } from './recepy-card/recepy-card.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { LoadingComponent } from './loading/loading.component';

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
    PopupComponent,
    ToastComponent,
    RecepyCardComponent,
    ItemListComponent,
    CategoryListComponent,
    LoadingComponent
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
    PopupComponent,
    ToastComponent,
    RecepyCardComponent,
    ItemListComponent,
    CategoryListComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
