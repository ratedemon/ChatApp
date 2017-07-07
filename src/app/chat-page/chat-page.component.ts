import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../shared/data.service';
import {Item} from '../shared/items.interface';
import {ChatService} from '../shared/chat.service';

@Component({
  moduleId: module.id,
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  // items: Item[] = [];
  items: any;
  user: any;
  msgVal: string = '';
  // look: boolean = false; 
  writing = true;
  constructor(private dataService: DataService, private router: Router, private chatService: ChatService) { }
  // @ViewChild('sendMessage') private myScrollContainer: ElementRef; 
  // ngOnInit() {
  //   this.dataService.initItems().subscribe(data=>{this.items=data;});
  //   this.dataService.initUser().subscribe(data=>{this.user = data;});
  // }
  // Send(desc: string) {
  //   this.dataService.sendMessage(this.user.displayName, desc, this.user.photoURL);
  //   this.msgVal = '';
  //   this.scrollToBottom();
  // }
  
  // showMore(){
  //   this.dataService.pagination();
  // }
  ngOnInit(){
    this.dataService.initUser().subscribe(data=>{this.user = data});
    this.chatService.getMessage().subscribe(data=>{this.items = data; console.log(this.items)});
    setTimeout(()=>{this.scrollToBottom();}, 3000);    
  }
  Send(desc: string){
    console.log(this.user.photoURL);
    this.chatService.sendMessage(this.user.displayName, desc, this.user.photoURL);
    this.msgVal = ""
  }
  showMore(){
    this.chatService.pagination();
  }
  scrollToBottom(){
    let main = document.querySelector('.main');
    window.scrollTo(0, main.scrollHeight);
  }
}
