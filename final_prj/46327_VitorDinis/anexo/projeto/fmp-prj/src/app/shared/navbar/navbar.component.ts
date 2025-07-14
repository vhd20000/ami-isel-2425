import { Component, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { Router } from '@angular/router';
import { CLOSE_APP_HEADER, CLOSE_APP_SUB_MSG, USER_LOGOUT_BODY, USER_LOGOUT_HEADER } from '../popup/popup.constants';
import { PopupComponent } from '../popup/popup.component';

const USER_PROFILE_PIC: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
const LOGIN_PAGE_ROUTE: string = "/login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {

  @ViewChild('popupLogout') popupLogout!: PopupComponent;
  @ViewChild('popupCloseApp') popupCloseApp!: PopupComponent;

  public userProfilePic: string = USER_PROFILE_PIC;
  public popupLogoutHeader: string = USER_LOGOUT_HEADER;
  public popupLogoutMsg: string = USER_LOGOUT_BODY;
  public popupCloseAppHeader: string = CLOSE_APP_HEADER;
  public popupCloseAppMsg: string = CLOSE_APP_SUB_MSG;

  constructor(
    private router: Router,
    public authService: FireauthService,
    public util: UtilityService,
  ) { }

  /**
   * -- PUBLIC METHODS
   */

  public handleLogout(): void {
    this.popupLogout.openPopup();
  }

  public handleCloseApp(): void {
    this.popupCloseApp.openPopup();
  }
  
  public logoutUser(): void {
    this.authService.doLogout()
      .then(res => {
        this.router.navigate([LOGIN_PAGE_ROUTE]);
      }, err => {
        console.log(err);
      });
  };
}
