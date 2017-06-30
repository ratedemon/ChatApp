import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../shared/data.service';
import {Item} from '../shared/items.interface';

@Component({
  moduleId: module.id,
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit, AfterViewChecked {
  items: Item[] = [];
  user: any;
  msgVal: string = '';
  look: boolean = false; 
  constructor(private dataService: DataService, private router: Router) { }
  @ViewChild('sendMessage') private myScrollContainer: ElementRef; 
  ngOnInit() {
    this.dataService.initItems().subscribe(data=>{this.items=data;});
    this.dataService.initUser().subscribe(data=>{this.user = data;});
    this.scrollToBottom();
  }
  Send(desc: string) {
    this.dataService.sendMessage(this.user.displayName, desc, this.user.photoURL);
    this.msgVal = '';
    this.scrollToBottom();
  }
  ngAfterViewChecked():void{
    // if(!this.look){
      // this.scrollToBottom();
      // this.look = !this.look;
    // }
  }
  scrollToBottom(){
      let main = document.querySelector('.main');
      window.scrollTo(0, main.scrollHeight);
      console.log('scroll');
      // console.log(this.myScrollContainer.nativeElement);
      // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
}
