import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpService} from 'app/shared/interceptors/http.service';
import {AppSettings} from 'app/shared/core/app.settings';


@Injectable()
export class Tabservice{
    public userData: any;
    public currentUser: any;
    public userdetailid:any;
    public SelectModuleIds:any;
    public SelectTransactionIds:any;
    public SelectGroupIds:any;
   constructor(public http:HttpService){} 
   public GetUserDetail():Observable<any>
   {
            this.userData = localStorage.getItem("currentUser");
            this.currentUser = JSON.parse(this.userData);
            this.userdetailid = localStorage.getItem("userdetailId");
            console.log(this.userdetailid);
            let body=JSON.stringify( {"userID": this.currentUser.UserID,"UserIDToLoad":this.userdetailid });
            return this.http.post(AppSettings.API_ENDPOINT+"/api/Users/UserDetail",body)
           //return this.http.get("assets/data/UserProfile.json")
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
    public updatemoduledata(moduleIDs)
    {
      debugger;
       this.userData = localStorage.getItem("currentUser");
       this.currentUser = JSON.parse(this.userData);
       this.userdetailid = localStorage.getItem("userdetailId");  
       this.SelectModuleIds=moduleIDs.join(',');
        let body=JSON.stringify( {"userID": this.currentUser.UserID,"userIDToInsert":this.userdetailid,"ModuleIDs": this.SelectModuleIds });
            return this.http.post(AppSettings.API_ENDPOINT+"/api/Users/UpdateUserModule",body)
        //   return this.http.get("assets/data/UserProfile.json")
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
     public updatetransactiondata(TransactionIDs)
    {
      debugger;
       this.userData = localStorage.getItem("currentUser");
       this.currentUser = JSON.parse(this.userData);
       this.userdetailid = localStorage.getItem("userdetailId");  
       this.SelectTransactionIds=TransactionIDs.join(',');
       let body=JSON.stringify( {"userID": this.currentUser.UserID,"userIDToInsert":this.userdetailid,"transactionsIDs": this.SelectTransactionIds });
       return this.http.post(AppSettings.API_ENDPOINT+"/api/Users/UpdateUserTransaction",body)
        //   return this.http.get("assets/data/UserProfile.json")
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
     public updategroupdata(groupIDs)
    {
      debugger;
       this.userData = localStorage.getItem("currentUser");
       this.currentUser = JSON.parse(this.userData);
       this.userdetailid = localStorage.getItem("userdetailId");  
       this.SelectGroupIds=groupIDs.join(',');
        let body=JSON.stringify( {"userID": this.currentUser.UserID,"userIDToInsert":this.userdetailid,"userGroupIDs": this.SelectGroupIds});
            return this.http.post(AppSettings.API_ENDPOINT+"/api/Users/UpdateUserGroup",body)
        //   return this.http.get("assets/data/UserProfile.json")
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