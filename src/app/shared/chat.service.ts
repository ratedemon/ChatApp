import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {BehaviorSubject} from 'rxjs';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

@Injectable()
export class ChatService {
  private url = 'http://localhost:5000';
  private urlMess = 'http://localhost:5000/messages'
  private socket;
  private couter: number = 1;
  private onlineUsers = new BehaviorSubject(0);
  private isWrite = new BehaviorSubject(false);
  constructor(private http: Http) {  }
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
      this.socket.on('onlineNow', (val)=>{
        this.onlineUsers.next(val);
      });
      this.socket.on('writing', (val)=>{
        this.isWrite.next(val);
      })
      return ()=>{
        this.socket.disconnect();
      }
    });
    // console.log(observable);
    return observable;
  }

  livePeople(){
    return this.onlineUsers;
  }
  
  sendMessage(user:string, message: string, photo: string){
    let obj = {
      name: user,
      message: message,
      photoURL: photo
    }
    this.socket.emit('messaging', obj);
  }
  writeMessage(){
    return this.isWrite;
  }
  pagination(){
    this.socket.emit('pagination', ++this.couter);
  }
  uploadImage(file, options){
    return new Promise((resolve,reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.open("POST", this.url+'/source', true);
      xhr.send(file);
      xhr.onload = function(){
        resolve(xhr.responseText);
      }
    })
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || { };
  }
}
