import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpService} from '../../shared/interceptors/http.service';
import {AppSettings} from '../../shared/core/app.settings';


@Injectable()
export class Userservice{
   public userData: any; 
   public currentUser: any;
   constructor(public http:HttpService){}
   
   public Userlist(Username,Fullname,Email):Observable<any>
     {
          this.userData = localStorage.getItem("currentUser");
          this.currentUser = JSON.parse(this.userData);
          let body=JSON.stringify( {"userID": this.currentUser.UserID,"username":Username,"fullname":Fullname,"email":Email,"PageSize":"50","Pagenumber":"1" });
          return  this.http.post(AppSettings.API_ENDPOINT+"/api/Users/UserList",body)
         .map((res) => {return res.json() });
         
     }
   public Adduser(Fullname,Username,Password,Email,selectLanguage):Observable<any>
   {
          this.userData = localStorage.getItem("currentUser");
          this.currentUser = JSON.parse(this.userData);
          let body=JSON.stringify( {"userID": this.currentUser.UserID,"Fullname":Fullname,"Username":Username,"Password":Password,"Email":Email,"LanguageID":selectLanguage,"TransactionCode":"90000001" });
          return this.http.post(AppSettings.API_ENDPOINT+"/api/Users/AddUser",body)
         .map(res => {
          if(res.status == 200)
            {
              return res.json();
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