import { Injectable } from '@angular/core';
import {MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import {Observable} from 'rxjs';
import {PopupComponent} from '../popup/popup.component';
@Injectable()

export class DialogService {
  constructor(private dialog: MdDialog) { }
  popup(title: string, message: string){
    let dialogRef: MdDialogRef<PopupComponent>;
    dialogRef = this.dialog.open(PopupComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
  openImage(image:string){
    let dialogRef: MdDialogRef<PopupComponent>;
    dialogRef = this.dialog.open(PopupComponent);
    dialogRef.componentInstance.image = image;
    
    return dialogRef.afterClosed();
  }
}
