import {Injectable } from '@angular/core';
import {HeaderComponent} from './header.component';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpService} from 'app/shared/interceptors/http.service';
import {AppSettings} from 'app/shared/core/app.settings';

@Injectable()

export class Headerservice{
      public userData: any; 
      public currentUser: any;
    constructor(public http:HttpService){}

 public  notificationservice():Observable<any>
  {
       this.userData = localStorage.getItem("currentUser");
       this.currentUser = JSON.parse(this.userData);
       let body=JSON.stringify( {"userID": this.currentUser.UserID});
       return  this.http.post(AppSettings.API_ENDPOINT+"/api/Notification/NotificationList",body)

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