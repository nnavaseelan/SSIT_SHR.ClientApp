import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Http, HttpModule ,RequestOptions,XHRBackend  } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LoginService } from './components/login/login.service';
import { MenuService } from './shared/menu/menu.service';
import { TranslationService } from './shared/translation/translation.service';
import { Userservice } from 'app/components/user/user.service';
import { CommonModule} from '@angular/common';
import { Tabservice} from 'app/components/user/components/tabs/tabs.service';
import { HttpService } from './shared/interceptors/http.service';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"; 
import { AppSettings } from './shared/core/app.settings';
import { Headerservice } from './shared/components/header/header.service';
import { DataTableModule} from "angular2-datatable";
import { Ng2CompleterModule } from "ng2-completer";
import {Approvalservice} from 'app/components/approval/approval.service';
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent      
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,ReactiveFormsModule,
        CommonModule, Ng2CompleterModule,
        HttpModule,
        AppRoutingModule,
        DataTableModule,
        TranslateModule.forRoot({
           loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [AuthGuard,LoginService,Headerservice,MenuService,HttpService,Userservice,TranslationService,AppSettings,Approvalservice,Tabservice],
    bootstrap: [AppComponent],
    schemas:   [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    
})
export class AppModule {
}
