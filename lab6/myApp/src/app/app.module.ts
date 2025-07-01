import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { provideAuth } from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyA6MmAzOxv2h2CT2rVEal7KmLnjEDXocFc",
  authDomain: "ami-lab6-database.firebaseapp.com",
  projectId: "ami-lab6-database",
  storageBucket: "ami-lab6-database.firebasestorage.app",
  messagingSenderId: "11583686344",
  appId: "1:11583686344:web:feb1be562870b423db87fd",
  measurementId: "G-5LWG5G5KE7"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
