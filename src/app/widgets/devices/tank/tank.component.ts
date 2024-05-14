import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FusionDataSource, TankAssetResp } from 'src/app/model/asset';
import { DataDetails } from 'src/app/model/company';
import { TankAssetService } from 'src/app/service/tank-asset.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss'],
})
export class TankComponent implements OnInit {
  dataSources: FusionDataSource[];
  tanksAsset$: Observable<TankAssetResp[]>;
  devices: DataDetails[];

  constructor(
    private tankAssetService: TankAssetService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.tanksAsset$ = this.tankAssetService.loadComapnyTankAssest().pipe(
      map((data) => {
        this.dataSources = data.map((tank) => {
          const value = tank.realTankLevel.split("=")[1];
          return {
            chart: {
              theme: "fusion",
              caption: tank.assetName,
              subcaption: tank.assetName,
              lowerLimit: "0",
              upperLimit: tank.realVolume.toString(),
              lowerLimitDisplay: "Empty",
              upperLimitDisplay: "Full",
              numberSuffix: " ltrs",
              showValue: "1",
              // chartBottomMargin: "25",
              //Changing the Cylinder fill color
              cylFillColor: "#1aaf5d",
              cylFillHoverColor: "#00ff00",
            },
            value,
          };
        });
        this.devices = data.map((el) => ({
          deviceId: el.deviceId,
          tab3: true,
          tab4: true,
          tab5: true,
          deviceName: el.assetName,
          manufDeviceId: el.assetId,
          latitude: 1,
          longitude: 1,
        }));
        return data;
      })
    );
  }

  frontEndUpdate(evt) {
    let fuelVolume = 55;
    let gaugeRef = evt.eventObj.sender;

    gaugeRef.chartInterval = setInterval(function () {
      fuelVolume < 10 ? (fuelVolume = 110) : "";
      var consVolume = fuelVolume - Math.floor(Math.random() * 3);
      gaugeRef.feedData("&value=" + consVolume);
      fuelVolume = consVolume;
    }, 1000);
  }

  minimize() {
    // let device = this.devices[deviceIndex];
    // this.devices.splice(deviceIndex, 1, { ...device, isCollapsed: true });
  }

  maximize() {}

  // dataDetails(device: number) {
  //   const modalRef = this.modal.open(CorporateLogsModalComponent, {
  //     size: "lg",
  //   });
  //   (modalRef.componentInstance as CorporateLogsModalComponent).device =
  //     this.devices[device];
  // }

}
