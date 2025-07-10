import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithPopup, getAuth } from '@firebase/auth';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(
    private fireService: FireService,
    private util: UtilityService,
    public afAuth: Auth,
    // public provider: GoogleAuthProvider
  ) {}

  async getCachedAccountId(): Promise<string | null> {
    return this.util.readUidFromCache();
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
      const auth = getAuth();
      signInWithEmailAndPassword(auth, value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }
  
  doLoginWithGoogle(value: any) {
    return new Promise<any>((resolve, reject) => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
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
