import { Component, OnInit } from '@angular/core';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DashboardHttpService } from 'src/app/service/dashboard-http.service';
import { DateHttpService } from 'src/app/service/date-http.service';
import { SessionService } from 'src/app/service/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tsc-explicit',
  templateUrl: './tsc-explicit.component.html',
  styleUrls: ['./tsc-explicit.component.scss'],
})
export class TscExplicitComponent implements OnInit {
  deviceId: string;
  singleData: any[];
  loadingSingle: boolean = true;
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
    this.singleChart();
  }

  singleChart() {
    this.subscription = this.session.userData
      .pipe(
        concatMap((user) => {
          return this.dateService.defaultDatesParams(user.userCompanyId).pipe(
            mergeMap((defaultDate) => {
              return this.dashboard
                .singleTimeChart(
                  this.deviceId,
                  user.userCompanyId,
                  `${defaultDate[0].start_dashbd_date} 00:00:00`,
                  `${defaultDate[0].end_date} 23:59:59`
                )
                .pipe(
                  map((value) => {
                    this.singleData = value.map((each) => {
                      return {
                        // attribute: each?.attribute,
                        // chartType: each?.charTypeName,
                        ...this.convertTimeSeriesChartValue(
                          each?.devNetwkTime,
                          each?.attributeValue,
                          each?.attribute
                        ),
                      };
                    });
                    this.loadingSingle = false;
                  })
                );
            })
          );
        })
      )
      .subscribe({
        error(e) {
          if (!e.status)
            this.toastService.error('You might be offline', 'Request Failed');
          else this.toastService.error('Unknown Error', '');
          this.activeModal.close();
        },
      });
  }

  // singleChart() {
  //   this.dateService
  //     .defaultDatesParams(this.companyId)
  //     .pipe(
  //       mergeMap((defaultDate) => {
  //         return this.dashboard
  //           .singleTimeChart(
  //             this.deviceId,
  //             this.companyId,
  //             `${defaultDate[0].start_dashbd_date} 00:00:00`,
  //             `${defaultDate[0].end_date} 23:59:59`
  //           )
  //           .pipe(
  //             map((value) => {
  //               this.singleData = value.map((each) => {
  //                 return {
  //                   // attribute: each?.attribute,
  //                   // chartType: each?.charTypeName,
  //                   ...this.convertTimeSeriesChartValue(
  //                     each?.devNetwkTime,
  //                     each?.attributeValue,
  //                     each?.attribute
  //                   ),
  //                 };
  //               });
  //               this.loadingSingle = false;
  //             })
  //           );
  //       })
  //     )
  //     .subscribe({
  //       error(e) {
  //         if (!e.status)
  //           this.toastService.error('You might be offline', 'Request Failed');
  //         else this.toastService.error('Unknown Error', '');
  //         this.activeModal.close();
  //       },
  //     });
  // }

  convertTimeSeriesChartValue(xAxes: string, yAxes: string, yValue: string) {
    let xAxesValues = xAxes.split(',');

    let yAxesValues = yAxes.split(',').map((value, i) => {
      return {
        [yValue]: Number.parseInt(value) === NaN ? 0 : Number.parseInt(value),
        time: xAxesValues[i],
        attribute: yValue,
      };
    });

    return yAxesValues;
  }
}
