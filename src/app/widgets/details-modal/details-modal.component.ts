import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { DataDetails } from 'src/app/model/company';
import { LastStatus } from 'src/app/model/device';
import { AssetService } from 'src/app/service/asset.service';
import { DashboardHttpService } from 'src/app/service/dashboard-http.service';
import { DateHttpService } from 'src/app/service/date-http.service';
import { SessionService } from 'src/app/service/session.service';
import { changeAttributeValue } from 'src/app/service/utilities';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent implements OnInit {
  name: string;
  segment = 'Last Status';
  data: LastStatus[];
  summarizedData: any[] = [];
  device: DataDetails;
  @Output() deviceId: string;
  chartColours: any;
  subscription: Subscription;

  lastStatusData: LastStatus[] = [];
  loadingState: boolean = true;
  loadingSummaryData = true;

  constructor(
    private modalCtrl: ModalController,
    private dashboard: DashboardHttpService,
    private dateService: DateHttpService,
    private readonly route: ActivatedRoute,
    private assetsDataService: AssetService,
    private session: SessionService
  ) {
  }

  ngOnInit() {
    // console.log(this.device);
    // this.lastStatus();

    this.deviceId = this.route.snapshot.paramMap.get('id');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // confirm() {
  //   return this.modalCtrl.dismiss(this.name, 'confirm');
  // }

  segmentClick(evt) {
    this.segment = evt.detail.value;
    console.log(this.segment);

    if (this.segment === 'Last Status') {
      this.lastStatus();
    }
    if (this.segment === 'Logs') {
      console.log('Logs');
    }
    if (this.segment === 'Summarized') {
      this.multipleCharts();
    }
  }

  lastStatus() {
    this.dashboard.latestDeviceLog(this.deviceId).subscribe((logs) => {
      this.loadingState = false;
      if (logs.messages.length === 0) {
        this.lastStatusData = [];
        //       // this.toastService.error('Device Last status not available');
      } else {
        const status = logs.messages[0].deviceLog.map((data, i) => {
          return data?.dataGroupAttributes?.map((val) => {
            return {
              data: val.attribute,
              value: changeAttributeValue(val),
              date: logs.messages[0].time,
            };
          });
        });
        if (status[0] === undefined && status[1] === undefined) {
          this.lastStatusData = [];
          // this.toastService.error('Device data not vailable');
          // this.lastStatusData = [
          //   { data: "No data", value: "No Value", date: "No Date" },
          // ];
        } else if (status[0] === undefined) {
          this.lastStatusData = status[1];
        } else if (status[1] === undefined) {
          this.lastStatusData = status[0];
        } else
          this.lastStatusData = status?.reduce((prev, next) =>
            prev.concat(next)
          );
        // console.log(this.lastStatusData);
      }
    });
  }

  multipleCharts() {
    this.subscription = this.session.userData
      .pipe(
        concatMap((user) => {
          return this.dateService.defaultDatesParams(user.userCompanyId).pipe(
            mergeMap((defaultDate) => {
              return this.dashboard.multiTimeChart(
                this.deviceId,
                `${defaultDate[0].start_dashbd_date} 00:00:00`,
                `${defaultDate[0].end_date} 23:59:59`
              );
            })
          );
        })
      )
      .subscribe((mchart) => {
        if (!mchart.length) {
          this.summarizedData = [];
          this.loadingSummaryData = false;
        } else {
          this.summarizedData = mchart;
          this.loadingSummaryData = false;
        }
      });
  }
}
