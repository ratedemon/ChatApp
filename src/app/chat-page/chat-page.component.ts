import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../shared/data.service';
import {Item} from '../shared/items.interface';
import {ChatService} from '../shared/chat.service';
import {trigger,state,style,animate,transition, keyframes, group} from '@angular/animations';
import {Headers, RequestOptions} from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0, 
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class ChatPageComponent implements OnInit, OnDestroy {
  items: any;
  user: any;
  msgVal: string = '';
  writing = false;
  initUser;
  initMessages;
  images: String[] = [];
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
    if(desc.trim().length<1){
      console.log(desc);
      return;
    }
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
  uploadPhoto(event){
    let fileList: FileList = event.target.files;
    console.log(fileList);
    if(fileList.length>0){
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      // for(let i=0;i<fileList.length;i++){
      //   formData.append('user_image', fileList[i], fileList[i].name);
      // }
      formData.append('userimage', file, file.name);
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({headers: headers});
      this.chatService.uploadUsersImage(formData, options).then(result=>console.log(result)).catch(err=>console.log(`Error: ${err}`));
    }
    // console.log(fileList);
  }
  ngOnDestroy(){
    // this.dataService.initUser().
    // this.chatService.getMessage().unsubscribe();
    this.initUser.unsubscribe();
    this.initMessages.unsubscribe();
  }
}
