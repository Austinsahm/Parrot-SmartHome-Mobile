import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { HttpResp, Response, StatusCode } from '../model/http';
import { Asset, SmartHomeDashboard } from '../model/asset';
import { BaseHttpService } from './base-http.service';
// import { User} from '../model/user'

@Injectable({
  providedIn: 'root',
})
export class AssetService extends BaseHttpService {
  constructor(protected readonly http: HttpClient) {
    super(http);
  }

  private floorDetails = new BehaviorSubject<SmartHomeDashboard[]>([]);
  private floorParams = new BehaviorSubject<string>('');

  getAssetList(subdomain: string) {
    return this.http
      .get<HttpResp<Asset[]>>(
        `${environment.apiServerEndpoint}/asset/asset-list/companyId/${subdomain}`
      )
      .pipe(
        map((_asset) => {
          return _asset.response;
        })
      );
  }

  getAssetDevices(subdomain: string, assetId: string) {
    return this.http
      .get<HttpResp<Asset[]>>(
        `${environment.apiServerEndpoint}/device/smart-home-dashboard/companyid/${subdomain}/assetid/${assetId}`
      )
      .pipe(
        map((_assetDevice) => {
          return _assetDevice;
        })
      );
  }

  // smartHomeDevice(
  //   companyId:string,
  //   assetId:string,
  // ): Observable<any>{
  //  return(
  //   this.http.get<HttpResp<Asset[]>>(
  //     `${environment.apiServerEndpoint}/device/smart-home-dashboard/companyid/${companyId}/assetid/${assetId}`)
  //  )
  // }

  smartHomeDevice(
    companyId: string,
    assetId: string
  ): Observable<SmartHomeDashboard[]> {
    if (`${companyId}${assetId}` === this.floorParams.value)
      return this.floorDetails.asObservable();
    const url = this.buildUrl(
      `device/smart-home-dashboard/companyid/${companyId}/assetid/${assetId}`
    );
    return this.check(this.http.get<Response<SmartHomeDashboard[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]).pipe(
      map((data) => {
        // console.log(data);

        this.floorDetails.next(data);
        this.floorParams.next(`${companyId}${assetId}`);
        return data;
      })
    );
  }

  getLocation(deviceId: string, floorPlanId: string) {
    return this.floorDetails.pipe(
      map((devices) => {
        const nnn = devices
          .find((device) => device.floorPlanId === floorPlanId)
          .devices.filter((m) => m.deviceId === deviceId)[0]
          .attributes.filter(
            (att) =>
              att.attribute === 'Latitude' || att.attribute === 'Longitude'
          );
        // console.log(nnn);
        return nnn;
      })
    );
  }

  getTempToken() {
    const url = this.buildUrl(`setup/archilogic/get-access-token`);
    return this.check(
      this.httpClient.post<Response<any>>(
        url,
        JSON.stringify({
          scopes: [
            { resource: 'floor', action: 'readPrivate' },
            { resource: 'floor', action: 'readPublic' },
            { resource: 'floor', action: 'queryPrivate' },
            { resource: 'floor', action: 'queryPublic' },
            { resource: 'floor', action: 'archive' },
            { resource: 'customFields', action: 'readPrivate' },
            { resource: 'customFields', action: 'readPublic' },
            { resource: 'customFields', action: 'write' },
          ],
        })
      )
    );
  }

  loadFloorSdk(): Promise<any> {
    const win = window as any;

    // if FloorPlanEngine is available, no need to call the script
    const floorModule = win;
    if (floorModule && floorModule.FloorPlanEngine) {
      return Promise.resolve(floorModule);
    }

    // call Archilogic Floor Plan script
    return new Promise((res, rej) => {
      const script = document.createElement('script');
      script.src = 'https://code.archilogic.com/fpe-sdk/v3.1.x/fpe.js';
      script.async = true;
      script.defer = false;

      document.body.appendChild(script);
      script.onload = () => {
        // check if FloorPlanEngine is available
        const floorSdk = win;
        if (floorSdk && floorSdk.FloorPlanEngine) {
          res(floorSdk);
        } else {
          rej('FloorPlanEngine constructor not found');
        }
      };
    });
  }
}
