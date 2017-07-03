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
  currentPage: number = 1; 
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    // this.pageSize.next(this.counter*30);
    // this.items = this.af.list('/message',{
    //   query:{
    //     limitToLast: this.page
    //   }
    // });
  }
  pagination(){
    // this.counter++;
    // this.items.subscribe(data=>console.log(data));
    // console.log(this.items.)
    this.currentPage++;
    this.items.subscribe(data=>console.log(data));
    
  }
  initItems(){
    return this.items = this.af.list('/messages', {
      query: {
        limitToLast: this.currentPage*30
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
