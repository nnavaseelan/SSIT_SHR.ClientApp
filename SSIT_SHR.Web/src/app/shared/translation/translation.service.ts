import { Injectable } from '@angular/core';

import {Http,RequestOptions,Headers} from '@angular/http';
import { Router } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import { HttpService } from '../interceptors/http.service';
import {AppSettings} from '../core/app.settings';

@Injectable()
export class TranslationService {
public userData: any;
public currentUser:any;
currentlabelTranslation:any;
labelTranslationItem:any;
    constructor(public http: HttpService,public router:Router) {
    }

   
 public  UserTranslation(): Observable<any>  {
    let languageID = localStorage.getItem('currentUser.languageID');    
    let body = JSON.stringify({  "Hash": "", "FileTypeID":languageID});
        return this.http.post(AppSettings.API_ENDPOINT+"/api/Users/UserTranslation",body)
            .map((res) =>{ console.log(res); return res.json()});
            
 }

 public getTranslationItem(item: string) {
     let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
     if(Menutranslationfile!=null)
     {
        this.currentlabelTranslation = JSON.parse(Menutranslationfile);
        this.labelTranslationItem=this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[1].values;
     }          
     if (!item) {
        return "No Trans";
     }
     if(!this.labelTranslationItem)
     {
        return "No Trans";
     }
     this.labelTranslationItem = this.labelTranslationItem.filter((fitem) => fitem.lbl.toLowerCase().indexOf(item.toLowerCase())>-1);
     if (!this.labelTranslationItem[0]) {
        return "No Trans";
     }
     return this.labelTranslationItem[0].txt
   }
}
