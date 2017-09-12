import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  baseUrl:string = 'http://185.101.159.96/SSIT-SHR-API/api';  

  storage = localStorage.getItem('access_token');


  getEmployeeList(data: Object): Observable<any> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.storage);
    return this.http.post(this.baseUrl + '/Employees/EmployeeList', JSON.stringify(data), headers);
  }

  getEmployeeDetail(data: Object): Observable<any> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + this.storage);
    return this.http.post(this.baseUrl + '/Employees/EmployeeDetail', JSON.stringify(data), headers);

  }
  
  saveMasterData(data: Object): Observable<any> {0
      let headers =  new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", "Bearer " + this.storage);
      return this.http.post(this.baseUrl + '/Employees/AddEditEmployee', JSON.stringify(data), headers);
  } 

}
