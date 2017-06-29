import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {}
  initItems(){
    return this.items = this.af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
  }
  initUser(){
    return this.user = this.afAuth.authState;
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
  registerUser(name, email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user=>{
      firebase.auth().currentUser.updateProfile({displayName:name, photoURL: ''});
    })
  }
  /*logUser(pp, name){
    this.af.list('users/').push({
      user: pp,
      name: name
    }).then(data=>console.log(data)).catch(error => console.log("Error: "+error));
  }
  saveUserInfo(uid, email, password){
    this.af.list('/users').forEach(el=>console.log(el));
    console.log(this.user, firebase.auth().currentUser);
    // this.user = this.afAuth.auth
    return this.af.list('users/').push({
      name: uid,
      email: email
    }).then(data=>console.log(data)).catch(error => console.log("Error: "+error));
  }*/
  sendMessage(name:string, msg:string, photo: string){
    return this.items.push({name: name, message: msg, photoURL: photo});
  }
  /*uploadPhoto(pic){
    let storage = firebase.storage();
    console.log(pic);
    // console.log(storage.app);
    console.log(storage.ref().storage)
  }*/
  logout(){
    return this.afAuth.auth.signOut()
  }
}
