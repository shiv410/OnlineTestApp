import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }

  private apiurl = "http://localhost:3000/users";

  AddNewUser(userinfo: any): Observable<object> {
    return this.httpclient.post(this.apiurl, userinfo);
  }

  ViewAllUsersDetails(): Observable<any> {
    return this.httpclient.get(this.apiurl);
  }

  DeleteUserById(id: any): Observable<any> {
    return this.httpclient.delete(this.apiurl + '/' + id);
  }

  getUserById(id: number): Observable<any> {
    return this.httpclient.get<any>(`${this.apiurl}/${id}`);
  }

}
