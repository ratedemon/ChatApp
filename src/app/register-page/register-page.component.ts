import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';
import {LoginService} from '../shared/login.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  description: string = "Register Page";
  email: string = "";
  password: string = "";
  repeatPassword: string = "";
  user: any;
  imageFile: File;
  imageUrl: string = '';
  fullName: string = "";
  constructor(private dataService: DataService, private loginService: LoginService) { }
  ngOnInit() {
    this.dataService.initUser().subscribe(data=>{this.user = data; console.log(this.user);})
  }
  loginForm(name,em, pass, fileurl){
    this.email = "";
    this.password = "";
    this.repeatPassword = "";
    this.fullName = "";
    console.log(fileurl);
    this.loginService.registerUser(name,em,pass);
  }
}
