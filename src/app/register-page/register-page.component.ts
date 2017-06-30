import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';
import {LoginService} from '../shared/login.service';
import {TranslateService, TranslatePipe} from '@ngx-translate/core';
import {Router} from "@angular/router";

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
  fullName: string = "";
  constructor(private dataService: DataService, private loginService: LoginService, private translate: TranslateService, private router:Router) { 
    // translate.addLangs(['en','ru']);

    // translate.setDefaultLang('en');
    // translate.use('en');
    // let browserLang = translate.getBrowserLang();
  }
  ngOnInit() {
    this.dataService.initUser().subscribe(data=>{this.user = data;})
  }
  loginForm(name,em, pass, fileurl){
    // console.log(fileurl);
    this.loginService.registerUser(name,em,pass).then(data=>{
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.fullName = "";
      this.router.navigate(['']);
    }).catch(err=>alert(err));
  }

}
