import { Component, OnInit, Output, ViewChild, } from '@angular/core';
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

export class AppComponent implements OnInit{
  user: any;  
  constructor(private dataService: DataService, private router: Router, private loginService: LoginService, private translate: TranslateService){
    translate.addLangs(['en','ru']);

    translate.setDefaultLang('en');
    translate.use('en');
    let browserLang = translate.getBrowserLang();
  }
  ngOnInit(){
    this.dataService.initUser().subscribe(data=>{this.user = data; console.log(this.user)});
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
