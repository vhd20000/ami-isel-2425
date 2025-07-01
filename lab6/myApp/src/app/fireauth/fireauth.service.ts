import { Injectable } from '@angular/core';
import { FireserviceService } from '../fireservice/fireservice.service';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(
    private firebaseService: FireserviceService,
    public afAuth: Auth
  ) {}

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
