import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../shared/data.service';
import {Item} from '../shared/items.interface';

@Component({
  moduleId: module.id,
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  items: Item[] = [];
  user: any;
  msgVal: string = '';
  look: boolean = false; 
  constructor(private dataService: DataService, private router: Router) { }
  @ViewChild('sendMessage') private myScrollContainer: ElementRef; 
  ngOnInit() {
    this.dataService.initItems().subscribe(data=>{this.items=data;});
    this.dataService.initUser().subscribe(data=>{this.user = data;});
    setTimeout(()=>{this.scrollToBottom();}, 3000);
    
  }
  Send(desc: string) {
    this.dataService.sendMessage(this.user.displayName, desc, this.user.photoURL);
    this.msgVal = '';
    this.scrollToBottom();
  }
  scrollToBottom(){
      let main = document.querySelector('.main');
      window.scrollTo(0, main.scrollHeight);
      console.log('scroll');
      // console.log(this.myScrollContainer.nativeElement);
      // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
  showMore(){
    this.dataService.pagination();
    // console.log(this.items);
  }
}
