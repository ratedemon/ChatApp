import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../shared/data.service';
import {Item} from '../shared/items.interface';
import {ChatService} from '../shared/chat.service';
import {Headers, RequestOptions} from '@angular/http';
import {itemAnim, myAnim} from '../animations/item.animation';
import {DialogService} from '../shared/dialog.service';

@Component({
  // moduleId: module.id,
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
  animations: [itemAnim, myAnim]
})
export class ChatPageComponent implements OnInit, OnDestroy {
  items: any;
  user: any;
  msgVal: string = '';
  writing = false;
  initUser;
  initMessages;
  image: string = '';
  constructor(private dataService: DataService, private router: Router, private chatService: ChatService, private dialogService: DialogService) { }
  ngOnInit(){
    this.initUser = this.dataService.initUser().subscribe(data=>{this.user = data});
    this.initMessages = this.chatService.getMessage().subscribe(data=>{this.items = data; console.log(this.items)});
    setTimeout(()=>{this.scrollToBottom();}, 1500);   
    // this.scrollToBottom(); 
  }
  Send(desc: string){
    if(desc.trim().length<1 && this.image.length<1){
      return;
    }
    console.log(desc);
    this.chatService.sendMessage(this.user.displayName, desc, this.user.photoURL, this.image);
    this.msgVal = "";
    this.image = '';
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
      this.chatService.uploadUsersImage(formData, options).then((result: string)=>this.image = result).catch(err=>console.log(`Error: ${err}`));
    }
  }
  ngOnDestroy(){
    this.initUser.unsubscribe();
    this.initMessages.unsubscribe();
  }
  removePic(){
    let removePic = this.image;    
    this.chatService.removeUsersImage(removePic).then(data=>{this.image = '';}).catch(err=>{console.log(err);this.dialogService.popup("Error", err._body)});
  }
}
