import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { DashboardHttpService } from 'src/app/service/dashboard-http.service';
import { DateHttpService } from 'src/app/service/date-http.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-static-charts',
  templateUrl: './static-charts.component.html',
  styleUrls: ['./static-charts.component.scss'],
})
export class StaticChartsComponent implements OnInit {
  deviceId: string;
  staticChartsData: any[] = [];
  loadingStaticChartsData = true;
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
    this.staticChart();
  }

  staticChart() {
    this.subscription = this.session.userData
      .pipe(
        concatMap((user) => {
          return this.dashboard.staticCharts(this.deviceId, user.userCompanyId);
        })
      )
      .subscribe((data) => {
        if (!data.length) {
          this.staticChartsData = [];
          this.loadingStaticChartsData = false;
        } else {
          this.staticChartsData = data.map((each) => ({
            ...this.convertStaticChart(
              each.minGaugeValue,
              each.maxGaugeValue,
              each.attribute,
              each.attributeValue
            ),
          }));
          this.loadingStaticChartsData = false;
        }
      });
  }

  // staticChart() {
  //   this.dashboard
  //     .staticCharts(this.deviceId, this.companyId)
  //     .subscribe((data) => {
  //       if (!data.length) {
  //         this.staticChartsData = [];
  //         this.loadingStaticChartsData = false;
  //       } else {
  //         this.staticChartsData = data.map((each) => ({
  //           ...this.convertStaticChart(
  //             each.minGaugeValue,
  //             each.maxGaugeValue,
  //             each.attribute,
  //             each.attributeValue
  //           ),
  //         }));
  //         this.loadingStaticChartsData = false;
  //       }
  //     });
  // }

  convertStaticChart(min: string, max: string, att: string, val: string) {
    const minVal = +min;
    const maxVal = +max;
    const valU = +val;
    return [
      {
        Label: `MAXIMUM ${att}`,
        Value: maxVal,
        Summary: `MAXIMUM ${att} ${maxVal}%`,
        title: att,
      },
      {
        Label: `MINIMUM ${att}`,
        Value: minVal,
        Summary: `MINIMUM ${att} ${minVal}%`,
        title: att,
      },
      {
        Label: `${att} VALUE`,
        Value: valU,
        Summary: `LAST ${att}`,
        title: `${att} - ${valU}`,
      },
    ];
  }
}
