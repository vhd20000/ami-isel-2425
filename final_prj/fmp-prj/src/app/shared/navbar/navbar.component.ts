import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

const USER_PROFILE_PIC: string = "https://ionicframework.com/docs/img/demos/avatar.svg";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {

  public userProfilePic: string = USER_PROFILE_PIC;

  constructor(private router: Router) { }

  /**
   * -- PUBLIC METHODS
   */

  public redirectTo(page: string): void {
    this.router.navigate([page]);
  };

  public logoutUser(): void {

  };

  public exitApp(): void {
    App.exitApp();
  };
}
