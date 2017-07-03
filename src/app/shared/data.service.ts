import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Item} from './items.interface';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<Item[]>;
  nextKey = new BehaviorSubject(1);
  pageSize = new BehaviorSubject(30);
  counter: number = 30;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.items = this.af.list('/messages', {
      query: {
        orderByKey: true,
        limitToLast: this.pageSize
      }
    });
    console.log(this.pageSize);
    this.items.subscribe(data=>{
      if(data.length==this.pageSize.getValue()){
        this.counter+=30;
        this.nextKey.next(this.counter);
        console.log(this.nextKey.getValue(), this.counter);
      }
    });
  }
  pagination(){
    this.pageSize.next(this.nextKey.getValue());
    console.log(this.pageSize.getValue(), this.nextKey.getValue());
  }
  initItems(){
    return this.items;
  }
  initUser(){
    return this.user = this.afAuth.authState;
  }
  sendMessage(name:string, msg:string, photo: string){
    return this.items.push({name: name, message: msg, photoURL: photo});
  }
  
}
