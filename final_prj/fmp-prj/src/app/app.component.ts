import { Component, OnInit, Optional } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';

const BACK_BUTTON_EVENT_PRIORITY: number = -1;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    // This line defines the Platform back button behaviour
    this.platform.backButton.subscribeWithPriority(BACK_BUTTON_EVENT_PRIORITY, () => {
      this.backButtonHandler();
    });
  }

  /**
   * PRIVATE METHODS
   */

  private backButtonHandler() {
    if (!this.routerOutlet?.canGoBack()) {
      App.exitApp();
    }
  }
}
