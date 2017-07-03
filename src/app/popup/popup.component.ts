import { Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  title: string;
  message: string
  constructor(private dialogRef: MdDialogRef<PopupComponent>) { }

}
