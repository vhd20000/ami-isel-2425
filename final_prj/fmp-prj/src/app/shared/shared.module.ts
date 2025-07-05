import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as Ionic from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FloatingActionButtonComponent } from './floating-action-button/floating-action-button.component';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    Ionic.IonicModule
  ],
  declarations: [
    ExploreContainerComponent, 
    NavbarComponent,
    FloatingActionButtonComponent
  ],
  exports: [
    ExploreContainerComponent, 
    NavbarComponent,
    FloatingActionButtonComponent,
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
