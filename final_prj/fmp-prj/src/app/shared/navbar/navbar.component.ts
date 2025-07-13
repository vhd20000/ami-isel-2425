import { Component } from '@angular/core';
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

  public userProfilePic: string = USER_PROFILE_PIC;

  constructor(
    private authService: FireauthService,
    private router: Router,
    public util: UtilityService,
  ) { }

  /**
   * -- PUBLIC METHODS
   */
  
  public logoutUser(): void {
    this.authService.doLogout()
      .then(res => {
        this.router.navigate([LOGIN_PAGE_ROUTE]);
      }, err => {
        console.log(err);
      });
  };
}
