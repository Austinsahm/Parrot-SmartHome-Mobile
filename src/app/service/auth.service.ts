import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResp } from '../model/http';
import { LoginData, UserInfo } from '../model/user';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  login(data: LoginData): Observable<boolean> {
    return this.http
      .post<HttpResp<UserInfo>>(
        `${environment.apiServerEndpoint}/user/login`,
        data
      )
      .pipe(
        catchError((e) => {
          return of(e);
        }),
        map((user) => {
          if (!user.response) return false;
          this.sessionService.setUser(user.response);
          return true;
        })
      );
  }
}
