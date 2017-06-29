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
import {LoginService} from './shared/login.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import {createTranslateLoader} from './translateLoader';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    LoginPageComponent,
    ChatPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule, AngularFireModule.initializeApp(config.firebase), AngularFireAuthModule, AngularFireDatabaseModule, FormsModule, RouterModule.forRoot(appRoutes),TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        // можно указать свой путь к папке i18n где находятся файлы с переводом
        useFactory: (createTranslateLoader), //изменилось
        deps: [Http]
      }
    })
  ],
  providers: [DataService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
