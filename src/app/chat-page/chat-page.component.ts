import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
export class ChatPageComponent implements OnInit, OnDestroy {
  items: any;
  user: any;
  msgVal: string = '';
  writing = false;
  initUser;
  initMessages;
  constructor(private dataService: DataService, private router: Router, private chatService: ChatService) { }
  /*@ViewChild('sendMessage') private myScrollContainer: ElementRef; 
  ngOnInit() {
    this.dataService.initItems().subscribe(data=>{this.items=data;});
    this.dataService.initUser().subscribe(data=>{this.user = data;});
  }
  Send(desc: string) {
    this.dataService.sendMessage(this.user.displayName, desc, this.user.photoURL);
    this.msgVal = '';
    this.scrollToBottom();
  }  
  showMore(){
    this.dataService.pagination();
  }*/
  ngOnInit(){
    this.initUser = this.dataService.initUser().subscribe(data=>{this.user = data});
    this.initMessages = this.chatService.getMessage().subscribe(data=>{this.items = data; console.log(this.items)});
    setTimeout(()=>{this.scrollToBottom();}, 3000);    
  }
  Send(desc: string){
    console.log(this.user.photoURL);
    this.chatService.sendMessage(this.user.displayName, desc, this.user.photoURL);
    this.msgVal = ""
  }
  typingMess(){
    this.chatService.writeMessage().subscribe(data=>this.writing = data);
  }
  showMore(){
    this.chatService.pagination();
  }
  scrollToBottom(){
    let main = document.querySelector('.main');
    window.scrollTo(0, main.scrollHeight);
  }
  ngOnDestroy(){
    // this.dataService.initUser().
    // this.chatService.getMessage().unsubscribe();
    this.initUser.unsubscribe();
    this.initMessages.unsubscribe();
  }
}
