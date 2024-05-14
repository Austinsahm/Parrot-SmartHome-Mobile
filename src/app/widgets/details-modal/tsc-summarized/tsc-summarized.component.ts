import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { DashboardHttpService } from 'src/app/service/dashboard-http.service';
import { DateHttpService } from 'src/app/service/date-http.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-tsc-summarized',
  templateUrl: './tsc-summarized.component.html',
  styleUrls: ['./tsc-summarized.component.scss'],
})
export class TSCSummarizedComponent implements OnInit {
  summarizedData: any[] = [];
  loadingSummaryData = true;
  deviceId: string;
  chartColours: any;
  subscription: Subscription;

  constructor(
    private dashboard: DashboardHttpService,
    private dateService: DateHttpService,
    private readonly route: ActivatedRoute,
    private session: SessionService
  ) {
  }

  ngOnInit() {
    this.deviceId = this.route.snapshot.parent.paramMap.get('deviceId');
    this.multipleCharts();
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
