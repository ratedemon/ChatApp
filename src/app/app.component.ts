import { Component, OnInit, Output } from '@angular/core';
import {DataService} from './shared/data.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Item} from './shared/items.interface'; 
import {ActivatedRoute, Router } from '@angular/router';
import {LoginService} from './shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title: string = "ChatApp";
  year = new Date().getFullYear();
  user: any;
  // msgVal: string = "";
  isMain: boolean = false;
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router, private loginService: LoginService){
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
  }
  logout(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
