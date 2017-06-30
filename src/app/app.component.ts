import { Component, OnInit, Output, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import {DataService} from './shared/data.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Item} from './shared/items.interface'; 
import {ActivatedRoute, Router } from '@angular/router';
import {LoginService} from './shared/login.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewChecked{
  // title: string = "ChatApp";
  year = new Date().getFullYear();
  user: any;
  isMain: boolean = false;
  @ViewChild('sendMessage') private myScrollContainer: ElementRef; 
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private loginService: LoginService, private translate: TranslateService){
    translate.addLangs(['en','ru']);

    translate.setDefaultLang('en');
    translate.use('ru');
    let browserLang = translate.getBrowserLang();
    console.log(browserLang);
    router.events.subscribe((url:any) => {if(url.url == '/' && url.url.length < 2){
      this.isMain = true
    }else{
      this.isMain = false;
    }
});
  }
  ngOnInit(){
    this.dataService.initUser().subscribe(data=>{this.user = data; console.log(this.user)});
    if(this.router.url == '/'){
      this.isMain = !this.isMain;
    }
    else{
      this.isMain = false;
    }
    this.scrollToBottom();
  }
  

  ngAfterViewChecked():void{
    this.scrollToBottom();
  }
  scrollToBottom(){
    if(this.router.url=="/chat"){
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;      
    }
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
