import {Routes} from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const appRoutes = [
  {path: '', component: LoginPageComponent},
  {path: 'chat', component: ChatPageComponent},
  {path: 'register', component: ChatPageComponent}
]