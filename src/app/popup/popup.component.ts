import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() message: string = "";
  @Input() type: string = "";

  constructor() { }

  ngOnInit() {
  }

}
