import { Injectable } from '@angular/core';

import {Http,RequestOptions,Headers} from '@angular/http';
import { Router } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import { HttpService } from '../interceptors/http.service';
import {AppSettings} from '../core/app.settings';

@Injectable()
export class MenuService {

menuItems: Array<any>;
public userData: any;
public currentUser:any;

constructor(public http: HttpService,public router:Router) {
     this.menuItems = [];
 }

 addMenu(items: Array<{
        text: string,
        heading?: boolean,
        link?: string,     // internal route links
        elink?: string,    // used only for external links
        target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
        icon?: string,
        alert?: string,
        submenu?: Array<any>
 }>) {
     items.forEach((item) => {
        this.menuItems.push(item);
    });
  }

 getMenu() {
     return this.menuItems;
 }

 public  LoadMenu(): Observable<any>
 {
    this.userData = localStorage.getItem("currentUser");
    this.currentUser = JSON.parse(this.userData);
    let body=JSON.stringify( {  "userID": this.currentUser.UserID });
       return this.http.post(AppSettings.API_ENDPOINT+"/api/Users/UserNavigation",body)
        .map((res) => {return res.json() });
     }
 }
