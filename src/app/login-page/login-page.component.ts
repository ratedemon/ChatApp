import { Component, OnInit, Input} from '@angular/core';
import {Item} from '../shared/items.interface';
import {DataService} from '../shared/data.service';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoginService} from '../shared/login.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from '../shared/dialog.service';

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
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute, private loginService: LoginService, private translate: TranslateService, private dialogService: DialogService) {  }

  ngOnInit() {
    this.dataService.initItems().subscribe(data=>{this.items=data;});
    this.dataService.initUser().subscribe(data=>{this.user = data;
    if(this.user !== null){
      this.go();
    }
  });
  }
  loginGoogle(){
    this.loginService.loginGoogle().catch(err=>this.openDialog(err.name,err.message));
  }
  loginFacebook(){
    this.loginService.loginFacebook().catch(err=>this.openDialog(err.name,err.message));
  }
  loginForm(em, pas){
    this.loginService.loginEmailandPassword(em,pas).then(data=>{
      this.email = "";
      this.password = "";
    }).catch(err=>this.openDialog(err.name, err.message));
  }
  go(){
    this.router.navigate(['chat']);
  }
  openDialog(title, message){
    this.dialogService.popup(title, message);
  }
}
