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
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "@angular/material";
import { PopupComponent } from './popup/popup.component';
import {DialogService} from './shared/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    LoginPageComponent,
    ChatPageComponent,
    RegisterPageComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule, AngularFireModule.initializeApp(config.firebase), AngularFireAuthModule, AngularFireDatabaseModule, FormsModule, NoopAnimationsModule,RouterModule.forRoot(appRoutes), HttpModule, MaterialModule, TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  exports:[
    TranslateModule
  ],
  providers: [DataService, LoginService, DialogService],
  bootstrap: [AppComponent], 
  entryComponents: [PopupComponent]
})
export class AppModule { }
