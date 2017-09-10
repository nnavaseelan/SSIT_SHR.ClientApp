import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';


// service to make authenticated api call
@Injectable()
export class HttpClient {
  constructor(private http: Http) { }

  baseUrl: 'http://185.101.159.96/SSIT-SHR-API/api/';

  handleError(error) {
    let err = error.json();
    // if (error.status === 401 || err.code === 401) {
    //   console.log('handle error ==>>', err.message);
    //   this.auth.logout();
    //   return Observable.throw(err);
    // } else {
    return Observable.throw(err);
    // }
  }

  hasTokenExpired(): boolean {
    let expire = localStorage.getItem('expire');
    if (expire && (new Date() >= new Date(expire))) {
      console.log('expire', new Date(expire));
      return true;
    }
    return false;
  }

  setHeader(headers: Headers) {
    let token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    headers.append('Authorization', 'Bearer ' + token);
  }

  refreshToken(): Observable<any> {
    let headers = new Headers({ "Content-Type": "application/json" })
    this.setHeader(headers);
    return this.http.get(this.baseUrl + '/api/refresh_token', { headers: headers })
      .map(res => res.json())
      .map(data => {
        console.log('refresh data', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('expire', data.expire);
      })
  }

  get(url: string, extraHeaders?: Headers): Observable<any> {
    let headers = !(extraHeaders) ? new Headers() : extraHeaders;
    this.setHeader(headers);

    if (this.hasTokenExpired()) {
      return this.refreshToken()
        .mergeMap(data => {
          return this.http.get(url, { headers: headers })
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
        })
        .catch(error => this.handleError(error));
    } else {
      return this.http.get(url, { headers: headers })
        .map((res: Response) => res.json())
        .catch(error => this.handleError(error));
    }
  }

  post(url: string, data: Object, extraHeaders?: Headers): Observable<any> {
    let headers = !(extraHeaders) ? new Headers() : extraHeaders;
    if (this.hasTokenExpired()) {
      return this.refreshToken()
        .mergeMap(data => {
          this.setHeader(headers);
          return this.http.post(url, data, { headers: headers })
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
        })
        .catch(error => this.handleError(error));
    } else {
      this.setHeader(headers);
      return this.http.post(url, data, { headers: headers })
        .map((res: Response) => res.json())
        .catch(error => this.handleError(error));
    }
  }

  put(url: string, data: Object, extraHeaders?: Headers): Observable<any> {
    let headers = !(extraHeaders) ? new Headers() : extraHeaders;
    if (this.hasTokenExpired()) {
      return this.refreshToken()
        .mergeMap(data => {
          this.setHeader(headers);
          return this.http.put(url, data, { headers: headers })
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
        })
        .catch(error => this.handleError(error));
    } else {
      this.setHeader(headers);
      return this.http.put(url, data, { headers: headers })
        .map((res: Response) => res.json())
        .catch(error => this.handleError(error));
    }
  }

  delete(url: string, extraHeaders?: Headers): Observable<any> {
    let headers = !(extraHeaders) ? new Headers() : extraHeaders;
    if (this.hasTokenExpired()) {
      return this.refreshToken()
        .mergeMap(data => {
          this.setHeader(headers);
          return this.http.delete(url, { headers: headers })
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
        })
        .catch(error => this.handleError(error));
    } else {
      this.setHeader(headers);
      return this.http.delete(url, { headers: headers })
        .map((res: Response) => res.json())
        .catch(error => this.handleError(error));
    }
  }
}


