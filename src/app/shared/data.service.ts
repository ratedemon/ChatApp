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
  firstKey = new BehaviorSubject('');
  nextKey = new BehaviorSubject('');
  pageSize = new BehaviorSubject(10);
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    // this.pageSize.next(this.counter*30);
    // this.items = this.af.list('/message',{
    //   query:{
    //     limitToLast: this.page
    //   }
    // });
    this.items = this.af.list('/messages', {
      query: {
        orderByKey: true,
        startAt: this.firstKey,
        limitToFirst: this.pageSize
      }
    });
  }
  pagination(){
    this.items.subscribe((data)=>{
      if(data.length===this.pageSize.getValue()){
        // this.nextKey.next(data.)
        // console.log(data[9].$key);
        this.nextKey.next(data[data.length-1].$key);
      }
    });
    this.firstKey.next(this.nextKey.getValue());
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
