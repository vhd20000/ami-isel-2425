
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FireauthService } from '../services/fireauth.service';
import { Auth } from '@angular/fire/auth';
import { UtilityService } from '../services/utility.service';

const LOGIN_PAGE_ROUTE = "/login";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private fireauthService: FireauthService,
    private afAuth: Auth,
    private util: UtilityService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /**
     * Check if there is a user currently logged in in Firebase Auth
     * 
     * Scenarios where this apply - After user log in
     */
    if (this.afAuth.currentUser) {
      return true;
    }

    /**
     * Apply a delay before checking if a user is currently logged in
     * 
     *    > By default, Firebase Auth keep users logged in;
     *    > This delay is used to ensure that Firebase Auth has
     *  initialized before checking whether a user is logged in
     *  or not;
     *    > If after this delay there is no current user, a
     *  logout is forced and the app redirects to the Login page.
     * 
     *  Scenarios where this apply - When user open the app 
     */
    return (async () => {
        await this.util.delay(1500);  // 1 and a half seconds (500ms)
        
        if (this.afAuth.currentUser) {
          return true;
        }
        else {
          this.fireauthService.doLogout();
          this.router.navigateByUrl(LOGIN_PAGE_ROUTE);
          return false;
        }
    })();
  }

}