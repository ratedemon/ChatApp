import { Component, OnInit, Output } from '@angular/core';
import {DataService} from './shared/data.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {Item} from './shared/items.interface'; 
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  items: Item[] = [];
  // user: any;
  title: string = "ChatApp";
  year = new Date().getFullYear();
  user: any;
  msgVal: string = "";
  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(){
  //   this.dataService.initItems().subscribe(data=>{this.items=data; console.log(data)});
    this.dataService.initUser().subscribe(data=>{this.user = data; console.log(this.user)});
  }
  logout(){
    this.dataService.logout();
    this.router.navigate(['/']);
  }
  // deleteItem(key: string){
  //   // console.log(key);
  //   this.items.remove(key);
  // }
}
