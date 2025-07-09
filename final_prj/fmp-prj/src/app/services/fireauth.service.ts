import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(
    private fireService: FireService,
    private util: UtilityService,
    public afAuth: Auth
  ) {}

  async getCachedAccountId(): Promise<string | null> {
    return this.util.readAccountIdFromCache();
  }

  doRegister(value: any) {
    return new Promise<any>((resolve, reject) => {
      createUserWithEmailAndPassword(this.afAuth, value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      signInWithEmailAndPassword(this.afAuth, value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      signOut(this.afAuth)
        .then(res => {
          console.log("User successfully logged out !")
          resolve(res);
        })
        .catch(err => {
          console.log("Logout ERROR: ", err);
          reject(err);
        });
    });
  }
}
