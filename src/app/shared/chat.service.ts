import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ChatService {
  private url = 'http://localhost:5000';
  private urlMess = 'http://localhost:5000/messages'
  private socket;
  private couter: number = 1;
  constructor() {  }
  getMessage(){
    // return this.http.get(this.urlMess).map(this.parseDate);
    let observable = new Observable(observer=>{
      this.socket = io(this.url);
      this.socket.on('chat', (data)=>{
        data = data.reverse();
        console.log(observable, observer, data);
        observer.next(data);
      });
      this.socket.on('messageToClient', (msg)=>{
        msg = msg.reverse();
        observer.next(msg);
      });
      return ()=>{
        this.socket.disconnect();
      }
    });
    // console.log(observable);
    return observable;

  }
  
  sendMessage(user:string, message: string, photo: string){
    let obj = {
      name: user,
      message: message,
      photoURL: photo
    }
    this.socket.emit('messaging', obj);
  }
  pagination(){
    this.socket.emit('pagination', ++this.couter);
  }
}
