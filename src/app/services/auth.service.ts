import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import {map} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { GuiaInterface } from '../models/guias';


@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }


  getAuth() {
    return this.afAuth.authState.pipe(map((auth: any) => auth));
  }

  loginTwitter () {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.TwitterAuthProvider());
  }

    loginFacebook() {
      return this.afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
    }


  loginGoogle() {
    return this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())


  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    });
  }

  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    });
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
  isAuth() {
     return this.afAuth.authState.pipe(map(auth => auth));
   }

//    isUserAdmin(userUid) {
//   return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
// }
//
//   private updateUserData(user){
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
//     const data: UserInterface = {
//     id: user.uid,
//     email: user.email,
//     roles: {
//       admin: true
//     }
//   }
//     return userRef.set(data, { merge: true })
//   }
}
