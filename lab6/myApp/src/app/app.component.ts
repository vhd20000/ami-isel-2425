import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private router: Router,
    private afAuth: Auth,
    private platform: Platform
  ) {}

  initializeApp() {
    this.platform.ready()
      .then(() => {
        let currentUser = this.afAuth.currentUser;

        if(currentUser) {
          this.router.navigate(["/tabs"]);
        } else {
          this.router.navigate(["/login"]);
        }
        
        SplashScreen.hide();

        // FIXME
        // StatusBar.styleDefault();
      });
  }
}
