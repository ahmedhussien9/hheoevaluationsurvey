import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;
  public tokenSubjectSource = new BehaviorSubject<string>('');
  public tokenSubjectData = this.tokenSubjectSource.asObservable();
  public isLogoutSubject = new BehaviorSubject<boolean>(false);
  public isLogoutState = this.isLogoutSubject.asObservable();
  public isUserOperationSource = new BehaviorSubject<boolean>(false);
  public isUserOperationState = this.isUserOperationSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubjectSource.next(token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      let token = localStorage.getItem('token') || '';
      this.token = token;
    }
    return this.token;
  }

  public getUserIdWhenLoginIn(): string {
    return localStorage.getItem('userId');
  }



  public logOut() {
    this.token = null;
    localStorage.clear();
    this.router.navigate([`/auth/login`]);
  }

  public login($userCredentials: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}auth/login`,
      $userCredentials,
      {
        observe: 'response',
      }
    );
  }
}
