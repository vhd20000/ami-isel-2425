import { Component, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { PopupComponent } from '../popup/popup.component';
import { CLOSE_APP_HEADER, CLOSE_APP_SUB_HEADER, CLOSE_APP_SUB_MSG } from '../popup/popup.constants';

const USER_PROFILE_PIC: string = "https://ionicframework.com/docs/img/demos/avatar.svg";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {

  @ViewChild(PopupComponent) popupComponent!: PopupComponent;

  public userProfilePic: string = USER_PROFILE_PIC;
  public popHeader = CLOSE_APP_HEADER;
  public popSubHeader = CLOSE_APP_SUB_HEADER;
  public popMsg = CLOSE_APP_SUB_MSG;

  constructor() { }

  /**
   * -- PUBLIC METHODS
   */
  
  public openPopupHandler() {
    this.popupComponent.openPopup();
  }

  public logoutUser(): void {

  };

  public exitApp(): void {
    App.exitApp();
  };
}
