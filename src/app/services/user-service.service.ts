
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.usersUrl = 'http://localhost:8080';
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, user)
      .pipe(map(user2 => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user2));
        this.currentUserSubject.next(user2);
        return user2;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public signup(user: User) {
    return this.http.post<User>(this.usersUrl + "/user/", user);
  }

  // public login(user: User) {
  //   return this.http.post<User>(this.usersUrl + "/authenticate", user);
  // }

}