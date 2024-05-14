import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as assert from 'assert';
import { Subscription, concatMap, map } from 'rxjs';
import { SmartHomeDevices } from 'src/app/model/asset';
import { DataDetails } from 'src/app/model/company';
import { AssetService } from 'src/app/service/asset.service';
import { SessionService } from 'src/app/service/session.service';
import { TankAssetService } from 'src/app/service/tank-asset.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
})
export class GeolocationComponent implements OnInit {
  deviceId: string;
  device: any;
  subscription: Subscription;
  assetId!: string;
  floorId!: string;
  lat: any;
  lng: any;

  constructor(
    private tankAssetService: TankAssetService,
    private readonly route: ActivatedRoute,
    private assetsDataService: AssetService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.deviceId = this.route.snapshot.parent.paramMap.get('deviceId');
    this.assetId = this.route.snapshot.parent.paramMap.get('id');
    this.floorId = this.route.snapshot.parent.paramMap.get('floorId');

    this.device = this.assetsDataService
      .getLocation(this.deviceId, this.floorId)
      .subscribe((data) => {
        this.lat = data.find(
          (latitude) => latitude.attribute === 'Latitude'
        ).attributeValue;
        this.lng = data.find(
          (longitude) => longitude.attribute === 'Longitude'
        ).attributeValue;

        // console.log(data, this.lat, this.lng);
      });
  }
}
