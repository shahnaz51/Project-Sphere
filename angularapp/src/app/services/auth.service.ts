import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { ApiUrl } from '../environment/env';
import { CryptoService } from './crypto.service';   

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = ApiUrl.apiUrl;

  private userRoleSubject = new BehaviorSubject<string>(
    localStorage.getItem('userRole') || ''
  );
  public userRole$ = this.userRoleSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string>(
    localStorage.getItem('userId') || ''
  );
  public userId$ = this.userIdSubject.asObservable();

  constructor(
    private http: HttpClient,
    private crypto: CryptoService                
  ) { }

  /**
   *  REGISTER — Encrypts password before sending to backend
   */
  register(user: User): Observable<any> {
    return from(this.crypto.encrypt(user.Password)).pipe(
      switchMap((encryptedPassword: string) => {
        const payload = {
          ...user,
          Password: encryptedPassword    //  encrypted blob
        };
        console.log('Register payload (encrypted):', payload);
        return this.http.post(`${this.apiUrl}/api/register`, payload);
      })
    );
  }

  /**
   * LOGIN — Encrypts password before sending to backend
   */
  login(login: Login): Observable<any> {
    return from(this.crypto.encrypt(login.Password)).pipe(
      switchMap((encryptedPassword: string) => {
        const payload = {
          Email: login.Email,
          Password: encryptedPassword    //  encrypted blob
        };
        console.log('Login payload (encrypted):', payload);
        return this.http.post(`${this.apiUrl}/api/login`, payload);
      }),
      tap((response: any) => {
        if (response && response.token) {
          const token = response.token;

          localStorage.setItem('token', token);

          const decodedToken = this.decodeToken(token);
          console.log('DECODED JWT:', decodedToken);

          const userId = decodedToken?.userId || '';
          const username = decodedToken?.username || '';
          const email = decodedToken?.email || '';
          const mobileNumber = decodedToken?.mobileNumber || '';
          const userRole = decodedToken?.userRole || '';
          // const userRole = decodedToken?.role || '';

          localStorage.setItem('userId', userId);
          localStorage.setItem('username', username);
          localStorage.setItem('email', email);
          localStorage.setItem('mobileNumber', mobileNumber);
          localStorage.setItem('userRole', userRole);

          this.userIdSubject.next(userId);
          this.userRoleSubject.next(userRole);
        }
      })
    );
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('mobileNumber');

    this.userRoleSubject.next('');
    this.userIdSubject.next('');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !this.isTokenExpired();
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getEmail(): string {
    return localStorage.getItem('email') || '';
  }

  getMobileNumber(): string {
    return localStorage.getItem('mobileNumber') || '';
  }

  isTokenExpired(): boolean {
    const token = this.getToken();

    if (!token) {
      return true;
    }

    try {
      const decodedToken = this.decodeToken(token);

      if (!decodedToken || !decodedToken.exp) {
        return true;
      }

      const expiryTime = decodedToken.exp * 1000;
      return Date.now() > expiryTime;
    } catch {
      return true;
    }
  }
}