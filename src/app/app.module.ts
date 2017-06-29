import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataService} from './shared/data.service';
import { AppComponent } from './app.component';
import {config} from './shared/firebaseConfig';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    LoginPageComponent,
    ChatPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule, AngularFireModule.initializeApp(config.firebase), AngularFireAuthModule, AngularFireDatabaseModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
