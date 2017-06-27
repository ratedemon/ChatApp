import { Component, OnInit } from '@angular/core';
import {DataService} from './shared/data.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Item} from './shared/items.interface'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  items: Item[] = [];
  // user: any;
  user: any;
  msgVal: string = "";
  constructor(private dataService: DataService){}
  ngOnInit(){
    this.dataService.initItems().subscribe(data=>{this.items=data; console.log(data)});
    this.dataService.initUser().subscribe(data=>{this.user = data; console.log(this.user)});
  }
  login(){
    this.dataService.loginFacebook();
  }
  logout(){
    this.dataService.logout();
  }
  Send(desc: string) {
    this.dataService.sendMessage(this.user.displayName, desc);
      this.msgVal = '';
  }
  // deleteItem(key: string){
  //   // console.log(key);
  //   this.items.remove(key);
  // }
}
