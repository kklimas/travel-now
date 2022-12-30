import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = "http://localhost:3000";
  private USERS = "/users";

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.BASE_URL}${this.USERS}`);
  }
  editUser(user: User) {
    return this.httpClient.put<void>(`${this.BASE_URL}${this.USERS}`, user);
  }
}
