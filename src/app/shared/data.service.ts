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
  // msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    // this.items = af.list('/messages', {
    //   query: {
    //     limitToLast: 50
    //   }
    // });
    // this.user = this.afAuth.authState;
  }
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
  // initUser(){

  // }
  loginGoogle(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginFacebook(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  logout(){
    return this.afAuth.auth.signOut()
  }
  sendMessage(name:string, msg:string){
    this.items.push({name: name, message: msg});
  }
}
