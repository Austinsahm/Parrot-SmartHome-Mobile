import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LastStatus } from 'src/app/model/device';
import { DashboardHttpService } from 'src/app/service/dashboard-http.service';
import { DateHttpService } from 'src/app/service/date-http.service';
import { changeAttributeValue } from 'src/app/service/utilities';

@Component({
  selector: 'app-last-status',
  templateUrl: './last-status.component.html',
  styleUrls: ['./last-status.component.scss'],
})
export class LastStatusComponent implements OnInit {
  lastStatusData: LastStatus[] = [];
  loadingState: boolean = true;
  deviceId: string;                                                                                       

  constructor(
    private dashboard: DashboardHttpService,
    private readonly route: ActivatedRoute,
    private dateService: DateHttpService
  ) {}

  ngOnInit() {
    this.deviceId = this.route.snapshot.parent.paramMap.get('deviceId');
    this.lastStatus();                                                        
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
        console.log(this.lastStatusData);
      }
    });
  }
}
