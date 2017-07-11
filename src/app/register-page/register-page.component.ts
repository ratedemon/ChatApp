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
  loginForm(name,em, pass, fileurl, event){
    // console.log(fileurl);
    // this.loginService.uploadPhoto(fileurl);
    // event.preventDefault();
    event.preventDefault();
    event.stopPropagation();
    console.log(name,em, pass, fileurl);
    this.loginService.registerUser(name,em,pass, fileurl).then(data=>{
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.imageUrl = '';
      this.router.navigate(['']);
      console.log(data);
    }).catch(err=>this.openDialog(err.name,err.message));
    return false;
  }
  onSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  uploadPhoto(event){
    // event.preventDefault();
    // event.stopPropagation();
    let fileList: FileList = event.target.files;
    console.log('in');
    if(fileList.length>0){
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('avatar', file, file.name);
      let headers = new Headers();
      // // console.log(formData);
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.chatService.uploadImage(formData, options).then((result:string) => {this.imageUrl = result; console.log('Result:' + result);}).catch(err=>{console.log(`Error: ${err}`);return false;});
      // .subscribe(data=>console.log(data));
    }
    return false;
  }
  openDialog(title, message){
    this.dialogService.popup(title, message);
  }
}
