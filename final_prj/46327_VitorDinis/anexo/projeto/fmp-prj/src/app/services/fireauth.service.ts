import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signOut, signInWithCredential } from '@firebase/auth';
import { UtilityService } from './utility.service';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

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
  
  doLoginWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      FirebaseAuthentication.signInWithGoogle()
        .then(res => {
          const credential = GoogleAuthProvider.credential(res.credential?.idToken);
          signInWithCredential(this.afAuth, credential)
            .then(
              res => resolve(res),
              err => reject(err),
            );
        });
    });
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
