import { Component, OnInit, Input} from '@angular/core';
import {Item} from '../shared/items.interface';
import {DialogService} from '../shared/dialog.service';
// import {itemAnim} from '../animations/item.animation';


@Component({
  moduleId: module.id,
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  // animations: [itemAnim]
})
export class ListItemComponent implements OnInit{
  @Input() item: Item; 
  @Input() user: string;
  @Input() userPhoto: string;
  avtor: boolean = false;
  hide: boolean = true;
  state = true;
  constructor(private dialogService: DialogService) {
   }
  ngOnInit(){
    if(this.item.name == this.user){
      this.avtor = !this.avtor;
    }
  }
  onFullScreen(image){
    this.dialogService.openImage(image);
  }
  animate(){
    this.state = !this.state
  }
  handleDone(event){
    console.log(event);
  }
}
