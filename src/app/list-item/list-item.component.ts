import { Component, OnInit, Input } from '@angular/core';
import {Item} from '../shared/items.interface';

@Component({
  moduleId: module.id,
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit{
  @Input() item: Item; 
  @Input() user: string;
  @Input() userPhoto: string;
  avtor: boolean = false;
  constructor() { }
  ngOnInit(){
    if(this.item.name == this.user){
      this.avtor = !this.avtor;
    }
  }
}
