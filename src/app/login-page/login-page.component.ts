import { Component, OnInit, Input} from '@angular/core';
import {Item} from '../shared/items.interface';
import {DataService} from '../shared/data.service';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoginService} from '../shared/login.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  items: Item[] = [];
  user: any;
  email:string = "";
  password:string = "";
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private loginService: LoginService, private translate: TranslateService) { 
    // translate.addLangs(['en','ru']);

    // translate.setDefaultLang('en');
    // translate.use('en');
    // let browserLang = translate.getBrowserLang();
  }

  ngOnInit() {
    this.dataService.initItems().subscribe(data=>{this.items=data;});
    this.dataService.initUser().subscribe(data=>{this.user = data;
    if(this.user !== null){
      this.go();
    }
  });
  }
  loginGoogle(){
    this.loginService.loginGoogle();
  }
  loginFacebook(){
    this.loginService.loginFacebook();
  }
  loginForm(em, pas){
    this.email = "";
    this.password = "";
    this.loginService.loginEmailandPassword(em,pas);
  }
  go(){
    this.router.navigate(['chat']);
  }
}
