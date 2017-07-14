import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import {config} from './firebaseConfig';
@Injectable()
export class LoginService {
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    // let user = firebase.auth().currentUser;
    // user.sendEmailVerification().then
  }
  registerUser(name, email, password, image){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user=>{
      firebase.auth().currentUser.updateProfile({displayName:name, photoURL: `images/avatars/${image}`});
      firebase.auth().currentUser.sendEmailVerification().then(()=>{
        console.log('Email send');
      }).catch(err=>console.log('Error ' +err));
    });
  }
  loginGoogle(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginFacebook(){
    let facebookUser = new firebase.auth.FacebookAuthProvider();
    facebookUser.addScope('user_birthday');
    return this.afAuth.auth.signInWithPopup(facebookUser);
  }
  loginEmailandPassword(em, pass){
    return this.afAuth.auth.signInWithEmailAndPassword(em, pass);
  }
  logout(){
    return this.afAuth.auth.signOut()
  }
}
