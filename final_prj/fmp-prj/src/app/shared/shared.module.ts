import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as Ionic from '@ionic/angular';

import { NavbarComponent } from './navbar/navbar.component';
import { FloatingActionButtonComponent } from './floating-action-button/floating-action-button.component';
import { ComingSoonNoticeComponent } from './coming-soon-notice/coming-soon-notice.component';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    Ionic.IonicModule
  ],
  declarations: [
    NavbarComponent,
    FloatingActionButtonComponent,
    ComingSoonNoticeComponent
  ],
  exports: [
    NavbarComponent,
    FloatingActionButtonComponent,
    ComingSoonNoticeComponent,
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
  ]
})
export class SharedModule { }
