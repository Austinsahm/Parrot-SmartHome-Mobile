import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DevicesLogResponse } from '../model/device';
import { AddressData } from '../model/geofencing';
import { Response, StatusCode } from '../model/http';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardHttpService extends BaseHttpService {

  constructor(httpClient: HttpClient,
    ) { 
      super(httpClient);
    }

  latestDeviceLog(deviceId: string): Observable<DevicesLogResponse> {
    const url = this.buildUrl(`device/deviceLogLatest/deviceId/${deviceId}`);

    return this.check(this.httpClient.get<Response<DevicesLogResponse>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  DeviceLogHstory(
    deviceId: string,
    startDate: string,
    endDate: string
  ): Observable<DevicesLogResponse> {
    const url = this.buildUrl(
      `device/deviceLogHistory/deviceId/${deviceId}/startDate/${startDate}/endDate/${endDate}`
    );

    return this.check(this.httpClient.get<Response<DevicesLogResponse>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  staticCharts(deviceId: string, companyId: string): Observable<any> {
    const url = this.buildUrl(
      `charts/static-charts/deviceId/${deviceId}/companyId/${companyId}`
    );
    return this.check(this.httpClient.get<Response<any>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  singleTimeChart(
    deviceId: string,
    companyId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const url = this.buildUrl(
      `charts/time-series/deviceId/${deviceId}/companyId/${companyId}/startDevNetwkTime/${startDate}/stopDevNetwkTime/${endDate}`
    );
    return this.check(this.httpClient.get<Response<any>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  multiTimeChart(
    deviceId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const url = this.buildUrl(
      `charts/combined-chart/deviceId/${deviceId}/startDevNetwkTime/${startDate}/stopDevNetwkTime/${endDate}`
    );
    return this.check(this.httpClient.get<Response<any>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

    /**
   *
   * @param lat
   * @param lng
   * @returns
   */
    geofenceDetail(lat: string, lng: string): Observable<AddressData> {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsApi}`;
      return this.httpClient.get<AddressData>(url);
    }

}
