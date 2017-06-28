import { Component, OnInit, Input } from '@angular/core';
import {Item} from '../shared/items.interface';
import {DataService} from '../shared/data.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  description: string = "Welcome in new ChatApp";
  items: Item[] = [];
  user: any;
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.initItems().subscribe(data=>{this.items=data; console.log(data)});
    this.dataService.initUser().subscribe(data=>{this.user = data; console.log(this.user);
    if(this.user !== null){
      this.go();
    }
  });
  }
  loginGoogle(){
    this.dataService.loginGoogle();
    
  }
  loginFacebook(){
    this.dataService.loginFacebook();
  }
  
  go(){
    this.router.navigate(['chat']);
  }
}
