import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Item} from './items.interface';

@Injectable()
export class DataService {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<Item[]>;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    let storage = firebase.app().database();
    console.log(storage);
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
  sendMessage(name:string, msg:string, photo: string){
    return this.items.push({name: name, message: msg, photoURL: photo});
  }
  
}
