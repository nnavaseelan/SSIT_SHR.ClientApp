import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpService} from '../../shared/interceptors/http.service';
@Injectable()
export class EmployeeService {

  constructor(private http: HttpService) { }

  baseUrl:string = 'http://185.101.159.96/SSIT-SHR-API/api';  

  storage = localStorage.getItem('access_token');

 
  getEmployeeList(data: Object): Observable<any> {
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.append("Authorization", "Bearer " + this.storage);
    let body=JSON.stringify(data);
    return this.http.post(this.baseUrl + '/Employees/EmployeeList',body);
  }

  getEmployeeDetail(data: Object): Observable<any> {
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.append("Authorization", "Bearer " + this.storage);
    let body=JSON.stringify(data);
    return this.http.post(this.baseUrl + '/Employees/EmployeeDetail',body);

  }
  
  saveMasterData(data: Object): Observable<any> {
      // let headers =  new Headers();
      // headers.append("Content-Type", "application/json");
      // headers.append("Authorization", "Bearer " + this.storage);
      let body=JSON.stringify(data);
      return this.http.post(this.baseUrl +'/Employees/AddEditEmployee',body);
  }

  saveProfilePicture(data: Object): Observable<any> {
      // let headers =  new Headers();
      // headers.append("Content-Type", "application/json");
      // headers.append("Authorization", "Bearer " + this.storage);
      let body=JSON.stringify(data);
      return this.http.post(this.baseUrl +'/Employees/EmployeePicture',body);
  }  

}
