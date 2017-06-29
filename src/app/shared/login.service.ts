import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {}
  registerUser(name, email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user=>{
      firebase.auth().currentUser.updateProfile({displayName:name, photoURL: ''});
    })
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
    this.af.list('users/')
    return this.afAuth.auth.signInWithEmailAndPassword(em, pass);
  }
  logout(){
    return this.afAuth.auth.signOut()
  }
}
