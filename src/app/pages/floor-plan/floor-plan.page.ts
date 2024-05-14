import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { Observable, Subscription, concatMap, map } from 'rxjs';
import { SmartHomeDashboard, SmartHomeDevices } from 'src/app/model/asset';
import { DeviceAttr } from 'src/app/model/assetsDevice';
import { DeviceAttribute } from 'src/app/model/company';
import { AssetService } from 'src/app/service/asset.service';
import { SessionService } from 'src/app/service/session.service';
import {
  changeAttributeValue,
  deviceDashboardIconSet,
} from 'src/app/service/utilities';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.page.html',
  styleUrls: ['./floor-plan.page.scss'],
})
export class FloorPlanPage implements OnInit, OnDestroy {
  @ViewChild('floorPlan', { static: true }) floorPlan!: ElementRef;
  floorId!: string;
  assetId!: string;
  floorPlanController: any;
  subscription: Subscription;
  devices: any;
  deviceAttr: DeviceAttr[];
  floorDevices: SmartHomeDevices[] = [];

  constructor(
    private assetsDataService: AssetService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.floorId = this.route.snapshot.parent.paramMap.get('floorId');
    this.assetId = this.route.snapshot.parent.paramMap.get('id');

    // this.floorPlan$ =
    this.subscription = this.assetsDataService
      .getTempToken()
      .pipe(
        concatMap((res) => {
          return this.assetsDataService.loadFloorSdk().then((floorSdk) => {
            const floorEl = this.floorPlan.nativeElement;
            const floorPlanStartupSettings = {
              hideElements: ['roomStamp'],
              panZoom: false,
              planRotation: 0,
              roomStampSize: null,
              ui: {
                menu: false,
                scale: false,
                coordinates: false,
              },
              theme: {
                background: {
                  color: '#f3f5f8',
                  showGrid: false,
                },
                wallContours: false,
                elements: {
                  roomstamp: { showArea: false },
                  asset: { fill: [255, 255, 255] },
                },
              },
              units: {
                system: 'metric',
                digits: 0,
                roomDimensions: 'area',
              },
            };

            this.floorPlanController = new floorSdk.FloorPlanEngine(
              floorEl,
              floorPlanStartupSettings
            );

            // load floor plan
            this.floorPlanController
              .loadScene(this.floorId, {
                authorization: res.authorization,
              })
              .then(() => {
                this.loadAssestDevices();
              });
          });
        })
      )
      .subscribe();
  }
  createSvg(svgPath?: string, alertStatus?: string): SVGSVGElement {
    var splitPath = svgPath?.split('*');

    const iconSvg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    iconSvg.setAttribute('height', '48');
    iconSvg.setAttribute('width', '48');
    iconSvg.classList.add('draggable');
    if (alertStatus === 'Y') {
      iconPath.setAttribute('fill', 'none');
      iconPath.setAttribute('stroke', 'red');
      iconPath.setAttribute('class', 'animate');
      if (splitPath.length > 1) iconPath.setAttribute('d', splitPath[1]);
      else iconPath.setAttribute('d', splitPath[0]);
    } else {
      iconPath.setAttribute('stroke', 'blue');
      iconPath.setAttribute('d', splitPath[0]);
    }
    iconSvg.appendChild(iconPath);
    return iconSvg;
  }

  /**
   * show devices svg on floor
   */
  loadAssestDevices() {
    // this.smarthome$ =
    this.subscription = this.session.userData
      .pipe(
        concatMap((user) => {
          return this.assetsDataService
            .smartHomeDevice(user.userCompanyId, this.assetId)
            .pipe(
              map((data) => {
                // this.devices= data.devices;
                // console.log(data);
                const device = data.find(
                  (el) => el.floorPlanId === this.floorId
                );

                const updateDevices = device.devices
                  .filter((dev, i) => {
                    if (
                      dev.position.lat &&
                      dev.position.lat !== 'null' &&
                      dev.position.lng &&
                      dev.position.lng !== 'null'
                    ) {
                      return dev;
                    }
                  })
                  .map((d, i) => {
                    let updateData = Object.assign({}, d);

                    updateData.expanded = `${i}`;
                    return updateData;
                  });

                /**********display only devices that have position************/
                // const updateDevices = device.devices.map((el, i) => {
                //   return el['filter']((dev) => {
                //       if (
                //         dev.position.lat &&
                //         dev.position.lat !== 'null' &&
                //         dev.position.lng &&
                //         dev.position.lng !== 'null'
                //       ) {
                //         return dev;
                //       }
                //     })
                //     .map((d) => {
                //       let updateData = Object.assign({}, d);
                //       // updateData.floorId = data[i].floorPlanId;
                //       updateData.expanded = `${i}`;
                //       return updateData;
                //     });
                // });
                // console.log(updateDevices);

                // const devices = data.find((el) => el.floorPlanId === "devices");
                // const devices = data.find((el) => el.devices);

                // console.log(updateDevices.devices);
                this.floorDevices = updateDevices;

                // console.log(updateDevices);

                // console.log(c);

                updateDevices.forEach((device, i) => {
                  var svg = this.createSvg(
                    device.sensorIcon,
                    device.notificationDue
                  );
                  svg.setAttribute('title', device.deviceId);

                  const iconDiv = document.createElement('div');
                  iconDiv.appendChild(svg);
                  iconDiv.classList.add('draggable');
                  iconDiv.setAttribute('draggable', 'true');
                  iconDiv.setAttribute('title', device.deviceName);
                  if (device.position) {
                    if (device.position.lat && device.position.lng) {
                      const c = this.floorPlanController.addHtmlMarker({
                        el: iconDiv,
                        pos: [+device.position.lat, +device.position.lng],
                      });

                      c.el.addEventListener('click', (evt: any) => {
                        evt.target.classList.add('fp-icon_selected');
                        setTimeout(() => {
                          evt.target.classList.remove('fp-icon_selected');
                        }, 10000);
                      });

                      const cont = this.floorPlan.nativeElement;
                      cont.addEventListener('click', (evt: any) => {
                        if (
                          device.deviceId === evt.target.attributes.title?.value
                        )
                          this.router.navigate(['']);
                      });
                    }
                  }
                });

                // device.devices.forEach((device, i) => {
                //   var svg = this.createSvg(device.sensorIcon, device.notificationDue);
                //   svg.setAttribute('title', device.deviceId);

                //   const iconDiv = document.createElement('div');
                //   iconDiv.appendChild(svg);
                //   iconDiv.classList.add('draggable');
                //   iconDiv.setAttribute('draggable', 'true');
                //   iconDiv.setAttribute('title', device.deviceName);
                //   if (device.position) {
                //     if (device.position.lat && device.position.lng) {
                //       const c = this.floorPlanController.addHtmlMarker({
                //         el: iconDiv,
                //         pos: [+device.position.lat, +device.position.lng],
                //       });

                //       c.el.addEventListener('click', (evt: any) => {
                //         evt.target.classList.add('fp-icon_selected');
                //         setTimeout(() => {
                //           evt.target.classList.remove('fp-icon_selected');
                //         }, 10000);
                //       });

                //       const cont = this.floorPlan.nativeElement;
                //       cont.addEventListener('click', (evt: any) => {
                //         if (device.deviceId === evt.target.attributes.title?.value)
                //           this.router.navigate(['']);
                //       });
                //     }
                //   }
                // });
              })
            );
        })
      )
      .subscribe();
  }

  deviceAttributes(attr: DeviceAttribute[]) {
    // console.log(attr);

    this.deviceAttr = attr.map((each) => {
      const iconData = deviceDashboardIconSet(
        each.attribute,
        each.attributeValue
      );
      const formatName = changeAttributeValue(each);

      return {
        attribute: each.attribute,
        attributeValue: formatName,
        icon: iconData.icon,
        color: iconData.color,
      };
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
