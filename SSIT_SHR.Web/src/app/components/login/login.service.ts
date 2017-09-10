import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {Http,RequestOptions,Headers,URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AppSettings} from './../../shared/core/app.settings';
import { TranslationService } from './../../shared/translation/translation.service';
@Injectable()
export class LoginService {
    constructor(public http: Http,public router:Router,public translation:  TranslationService) { }
  
    public UserLogin(ClientCode,UserName,password){
        
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers});
        let body = new URLSearchParams();
        body.set('CompanyName', ClientCode);
        body.set('UserName', UserName);
        body.set('Password', password);
        body.set('grant_type', 'password');
     
     //return   this.http.post('http://185.101.159.96/SSIT-SHR-API/token',body,options)
      return   this.http.post(AppSettings.API_ENDPOINT+'token',body,options)
        .map(
        response => {
          if(response.status == 200)
            {
                 localStorage.setItem('access_token', response.json().access_token);
                 localStorage.setItem('currentUser.username',response.json().username);
                 localStorage.setItem('currentUser',JSON.stringify(response.json()));
                 localStorage.setItem('currentUser.languageID',response.json().languageID);
                 localStorage.setItem('currentUser.UserID',response.json().UserID);  
                return response.json();
            }
        },
        error => {
          if(error.status == 0)
            {
               return error.json();
            }
        }
      );
      
 }

   
}