import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users?email=${email}&password=${password}`;
    return this.http.get(url);
  }

  signUp(user: User): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.post(url, user);
  }
}
