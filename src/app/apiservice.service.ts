import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient, private router: Router) { }
  baseURL: string = environment.apiUrl;
  userLogin(object): Observable<any> {
    return this.http.post(this.baseURL + "login", object).pipe(map((res: any) => res));
  }
  userSignup(object): Observable<any> {
    return this.http.post(this.baseURL + "signup", object).pipe(map((res: any) => res));
  }
  createPost(object): Observable<any> {
    return this.http.post(this.baseURL + "create-post", object).pipe(map((res: any) => res));
  }
  updatePost(object): Observable<any> {
    return this.http.post(this.baseURL + "update-post", object).pipe(map((res: any) => res));
  }
  deletePost(object): Observable<any> {
    return this.http.post(this.baseURL + "delete-post", object).pipe(map((res: any) => res));
  }
  getPost(object): Observable<any> {
    return this.http.post(this.baseURL + "get-post", object).pipe(map((res: any) => res));
  }
  getPostByTag(object): Observable<any> {
    return this.http.post(this.baseURL + "get-posts-by-tag", object).pipe(map((res: any) => res));
  }
}
