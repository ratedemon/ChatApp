import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {DataService} from './data.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {PrivateItem} from './private';

@Injectable()
export class PrivateDialogService {
  items: FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;
  message: PrivateItem;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private dataService: DataService) { 
    this.user = this.dataService.initUser();
  }
  initUser(){
    return this.user;
  }
  initListMessage(id: string){
    return this.items = this.af.list('/private/'+id, {
      query: {
        orderByKey: true,
        limitToLast: 30
      }
    });
  }
  sendMess(name: string, message: string){
    this.items.push({name: name, message: message});
  }
}
