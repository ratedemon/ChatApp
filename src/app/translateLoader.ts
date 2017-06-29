import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
export function createTranslateLoader(http: Http){
  return new TranslateHttpLoader(http, './translates', '.json');
}