import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';
import {PrivateDialogService} from '../shared/private-dialog.service';


@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {
  user: any;
  items: any[];  
  constructor(private dataService: DataService, private privateChatService: PrivateDialogService) { }
  ngOnInit() {
    // this.dataService.initItems().subscribe(data=>{this.items=data;});
    // this.dataService.initUser().subscribe(data=>{this.user = data;console.log(this.user.uid);
    // this.privateChatService.
    // });
    this.privateChatService.initUser().subscribe(userId=>{this.user = userId;
    this.privateChatService.initListMessage(this.user.uid).subscribe(data=>{this.items = data; console.log(data)});
    });
  }
  send(){
    this.privateChatService.sendMess('Admin', 'Text message! Please dont try this at home, or at school, or anywhere');
  }
}
