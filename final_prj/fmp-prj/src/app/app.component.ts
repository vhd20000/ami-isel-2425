import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { PopupComponent } from './shared/popup/popup.component';
import { CLOSE_APP_HEADER, CLOSE_APP_SUB_HEADER, CLOSE_APP_SUB_MSG } from './shared/popup/popup.constants';
import { UtilityService } from './services/utility.service';

const BACK_BUTTON_EVENT_PRIORITY: number = -1;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

    public popHeader = CLOSE_APP_HEADER;
    public popSubHeader = CLOSE_APP_SUB_HEADER;
    public popMsg = CLOSE_APP_SUB_MSG;

  constructor(
    private util: UtilityService,
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
    let canGoBack: boolean = this.routerOutlet?.canGoBack() ?? false;
    this.util.openToast(`can go back ? ${canGoBack.toString()}`);
    if (!canGoBack) {
      this.popupComponent.openPopup();
    }
  }

  /**
   * PUBLIC METHODS
   */

  public exitApp() {
    App.exitApp();
  }
}
