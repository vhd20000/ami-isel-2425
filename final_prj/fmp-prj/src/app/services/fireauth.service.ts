import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { Auth, signInWithCredential } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signOut, getAuth, signInWithRedirect, UserCredential, setPersistence, browserLocalPersistence, User, updateCurrentUser, reload, signInWithCustomToken, reauthenticateWithCredential, OAuthCredential } from '@firebase/auth';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(
    private fireService: FireService,
    private util: UtilityService,
    public afAuth: Auth,
  ) {}

  doRegisterWithEmailAndPassword(value: any) {
    return new Promise<any>((resolve, reject) => {
      createUserWithEmailAndPassword(this.afAuth, value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  doLoginWithEmailAndPassword(value: any) {
    return new Promise<any>((resolve, reject) => {
      signInWithEmailAndPassword(this.afAuth, value.email, value.password)
        .then(
          res => resolve(res), 
          err => reject(err)
        );
    });
  }
  
  doLoginWithGoogle(value: any) {
    // return new Promise<any>((resolve, reject) => {
    //   const auth = getAuth();
    //   const provider = new GoogleAuthProvider();
    //   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    //   signInWithRedirect(auth, provider)
    //     .then(
    //       res => resolve(res),
    //       err => reject(err)
    //     );
    // });
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      signOut(this.afAuth)
        .then(
          res => resolve(res),
          err => reject(err),
        )
    });
  }
}
