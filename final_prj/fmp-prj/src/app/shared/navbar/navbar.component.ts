import { Component, ViewChild } from '@angular/core';
import { App } from '@capacitor/app';
import { PopupComponent } from '../popup/popup.component';
import { CLOSE_APP_HEADER, CLOSE_APP_SUB_HEADER, CLOSE_APP_SUB_MSG } from '../popup/popup.constants';
import { UtilityService } from 'src/app/services/utility.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { Router } from '@angular/router';

const USER_PROFILE_PIC: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
const LOGIN_PAGE_ROUTE: string = "/login";

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

  constructor(
    private util: UtilityService,
    private authService: FireauthService,
    private router: Router
  ) { }

  /**
   * -- PUBLIC METHODS
   */
  
  public openPopupHandler() {
    this.popupComponent.openPopup();
  }

  public logoutUser(): void {
    this.authService.doLogout()
      .then(res => {
        this.util.clearCache();
        this.router.navigate([LOGIN_PAGE_ROUTE]);
      }, err => {
        console.log(err);
      });
  };

  public exitApp(): void {
    App.exitApp();
  };
}
