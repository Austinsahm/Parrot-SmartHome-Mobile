import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TankAssetResp } from '../model/asset';
import { DataDetails } from '../model/company';
import { Response, StatusCode } from '../model/http';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class TankAssetService extends BaseHttpService {
  private tankUrl = `${environment.apiServerEndpoint}/asset/tanks/company-id`;
  private devices = new BehaviorSubject<DataDetails[]>([]);

  devices$ = this.devices.asObservable();

  constructor(private http: HttpClient) {
    super(http);
  }

  loadComapnyTankAssest(companyId:string): Observable<TankAssetResp[]> {
    return this.check(
      this.http.get<Response<TankAssetResp[]>>(
        `${this.tankUrl}/${companyId}`
      ),
      [StatusCode.OK, StatusCode.SUCCESS]
    );
  }

  /**
   * save devices to subject
   * @param devices
   */
  addDevices(devices: DataDetails[]) {
    this.devices.next(devices);
  }

  filterDevice(deviceId: string): DataDetails {
    const device= this.devices.value.filter(
      (device) => device.deviceId === deviceId
    )    
    return device[0]
  }
}
