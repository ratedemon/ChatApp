import { Component, OnInit, Output, ViewChild, } from '@angular/core';
import {DataService} from './shared/data.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Item} from './shared/items.interface'; 
import {ActivatedRoute, Router } from '@angular/router';
import {LoginService} from './shared/login.service';
import {TranslateService} from '@ngx-translate/core';
import {ChatService} from './shared/chat.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  user: any;  
  year = new Date().getFullYear();
  online_people: number = 0;
  initPeople;
  constructor(private dataService: DataService, private router: Router, private loginService: LoginService, private translate: TranslateService, private chatService: ChatService){
    translate.addLangs(['en','ru']);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    // console.log(browserLang, browserLang.match(/en|ru/));
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    // translate.use('en');
  }
  ngOnInit(){
    this.initPeople = this.dataService.initUser().subscribe(data=>{this.user = data});
    this.chatService.livePeople().subscribe(data=>{this.online_people = data; console.log(data)});
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
    this.initPeople.unsubscribe();
    this.online_people = null;
  }
}
