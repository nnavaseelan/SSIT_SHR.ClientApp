import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AppSettings} from '../../shared/core/app.settings';
import {HttpService} from '../../shared/interceptors/http.service';
@Injectable()
export class Approvalservice {
   public userData:any;
   public currentUser:any;
  constructor(private http: HttpService) { }

  public userApproval()
  {
    
     this.userData = localStorage.getItem("currentUser");
     this.currentUser = JSON.parse(this.userData);
     let body=JSON.stringify( {"userID": this.currentUser.UserID});
     return this.http.post(AppSettings.API_ENDPOINT+"/api/Approval/GetUserPendingApproval",body)
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
 public Approveduser()
 {
    this.userData = "8B62A630-3B82-485B-A669-CDFA7919D75B";

     this.currentUser = "F36D3B2E-8F28-4BC5-BEDA-EA373C697C8E";

     let body=JSON.stringify( {"userID":  this.userData,"RequestID": this.currentUser});
     return this.http.post(AppSettings.API_ENDPOINT+" /api/Approval/ApprovePaymentRequest",body)
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
    public Declineduser()
    {
     this.userData = "8B62A630-3B82-485B-A669-CDFA7919D75B";
     this.currentUser = "F36D3B2E-8F28-4BC5-BEDA-EA373C697C8E";
     let body=JSON.stringify( {"userID":  this.userData,"RequestID": this.currentUser});
     return this.http.post(AppSettings.API_ENDPOINT+" /api/Approval/ApprovePaymentRequest",body)
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
