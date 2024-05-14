import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../model/device';
import { HttpResp } from '../model/http';
import { UserInfo } from '../model/user';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private serverUrl = environment.apiServerEndpoint;
  private smartHome = new BehaviorSubject<Device[]>([]);
  private user: UserInfo;

  smartHomeDevices$ = this.smartHome.asObservable();
  constructor(private http: HttpClient, private session: SessionService) {
    session.userData.subscribe((user) => (this.user = user));
  }

  getSmartHomeDevices() {
    this.http
      .get<HttpResp<Device[]>>(
        `${this.serverUrl}/device/device-dashboard/companyId/${this.user.userCompanyId}/day/5/userId/${this.user.userId}/networkId/ALL/useCaseId/20`
      )
      .pipe(
        catchError((e) => {
          if (this.smartHome.value.length) {
            //dont reset if value exist earlier
            // show errorconnecting
          }
          // show errorconnecting
          return of(null);
        }),
        tap((devices) => this.smartHome.next(devices.response))
      )
      .subscribe();
  }
}
