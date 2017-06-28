import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';
import {Item} from '../shared/items.interface';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  items: Item[] = [];
  user: any;
  msgVal: string = '';
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataService.initItems().subscribe(data=>{this.items=data;});
    this.dataService.initUser().subscribe(data=>{this.user = data;});
  }
  Send(desc: string) {
    this.dataService.sendMessage(this.user.displayName, desc);
    this.msgVal = '';
  }
}
