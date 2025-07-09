
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { FireauthService } from '../services/fireauth.service';

const LOGIN_PAGE_ROUTE = "/login";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private fireauth: FireauthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const obs = this.fireauth.getCachedAccountId().then(value => {
      if (!value || value === "") {
        this.router.navigateByUrl(LOGIN_PAGE_ROUTE);
        return false;
      }
      else {
        return true;
      }
    });
    return from(obs);
  }

}