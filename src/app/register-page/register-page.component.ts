import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';
import {LoginService} from '../shared/login.service';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';
import {Router} from "@angular/router";
import {DialogService} from '../shared/dialog.service';
import {ChatService} from '../shared/chat.service';
import {Headers, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  email: string = "";
  password: string = "";
  repeatPassword: string = "";
  user: any;
  imageFile: File;
  imageUrl: string = '';
  constructor(private dataService: DataService, private loginService: LoginService, private translate: TranslateService, private router:Router, private dialogService: DialogService, private chatService: ChatService) {}
  ngOnInit() {
    this.dataService.initUser().subscribe(data=>{this.user = data;})
  }
  loginForm(name,em, pass, fileurl){
    // console.log(fileurl);
    // this.loginService.uploadPhoto(fileurl);
    this.loginService.registerUser(name,em,pass, fileurl).then(data=>{
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.imageUrl = '';
      this.router.navigate(['']);
    }).catch(err=>this.openDialog(err.name,err.message));
  }
  uploadPhoto(event){
    let fileList: FileList = event.target.files;
    if(fileList.length>0){
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.chatService.uploadImage(formData, options)
      .then((result:string) => this.imageUrl = result).catch(err=>console.log(`Error: ${err}`));
    }
  }
  openDialog(title, message){
    this.dialogService.popup(title, message);
  }
}
