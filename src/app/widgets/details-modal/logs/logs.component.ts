import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryData } from 'src/app/model/device';
import { DashboardHttpService } from 'src/app/service/dashboard-http.service';
import { DateHttpService } from 'src/app/service/date-http.service';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { changeAttributeValue } from 'src/app/service/utilities';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  logs: HistoryData[] = [];
  deviceId: string;

  deviceHistoryData: HistoryData[] = [];
  loadingHistory: boolean = true;
  subscription: Subscription;

  constructor(
    private dashboard: DashboardHttpService,
    private readonly route: ActivatedRoute,
    private dateService: DateHttpService,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.deviceId = this.route.snapshot.parent.paramMap.get('deviceId');
    this.deviceHistory();
  }

  deviceHistory() {
    this.subscription = this.session.userData
      .pipe(
        concatMap((user) => {
          return this.dateService.defaultDatesParams(user.userCompanyId).pipe(
            mergeMap((defaultDate) => {
              return this.dashboard
                .DeviceLogHstory(
                  this.deviceId,
                  `${defaultDate[0].start_dashbd_date} 00:00:00`,
                  `${defaultDate[0].end_date} 23:59:59`
                )
                .pipe(
                  map((logs) => {
                    return logs.messages.map((data) => {
                      if (data?.deviceLog.length === 1) {
                        const second = {
                          Date: data?.time,
                          'Sequence #': data?.seqNumber,
                          Type: data?.deviceLog[0]?.dataGroup,
                          Action:
                            data?.deviceLog[0]?.dataGroup === 'Data'
                              ? data?.deviceLog[0]?.dataGroup
                              : 'Atlas network position',
                          Data: data?.deviceLog[0].dataGroupAttributes.map(
                            (el) =>
                              ` ${el.attribute}: ${changeAttributeValue(el)}`
                          ),
                        };
                        return [second];
                      } else {
                        const msg =
                          data?.deviceLog[0]?.dataGroupAttributes.splice(0, 1);
                        const first = {
                          Date: data?.time,
                          'Sequence #': data?.seqNumber,
                          Type: data?.deviceLog[0]?.dataGroup,
                          Action: msg[0]?.attribute,
                          Data: data?.deviceLog[0].dataGroupAttributes.map(
                            (el) =>
                              ` ${el.attribute}: ${changeAttributeValue(el)}`
                          ),
                        };
                        const second = {
                          Date: data?.time,
                          'Sequence #': data?.seqNumber,
                          Type: data?.deviceLog[1].dataGroup,
                          Action: 'Atlas network position',
                          Data: data?.deviceLog[1].dataGroupAttributes.map(
                            (el) => ` ${el.attribute}: ${el.attributeValue}`
                          ),
                        };
                        return [first, second];
                      }
                    });
                  })
                );
            })
          );
        })
      )
      .subscribe((data) => {
        this.loadingHistory = false;
        if (data.length === 0) {
          this.deviceHistoryData = [];
        } else {
          this.deviceHistoryData = data
            ?.reduce((prev, next) => {
              return prev.concat(next);
            })
            .reverse();
        }
      });
  }

  // deviceHistory() {
  //   this.dateService
  //     .defaultDatesParams(this.companyId)
  //     .pipe(
  //       mergeMap((defaultDate) => {
  //         return this.dashboard
  //           .DeviceLogHstory(
  //             this.deviceId,
  //             `${defaultDate[0].start_dashbd_date} 00:00:00`,
  //             `${defaultDate[0].end_date} 23:59:59`
  //           )
  //           .pipe(
  //             map((logs) => {
  //               return logs.messages.map((data) => {
  //                 if (data?.deviceLog.length === 1) {
  //                   const second = {
  //                     Date: data?.time,
  //                     'Sequence #': data?.seqNumber,
  //                     Type: data?.deviceLog[0]?.dataGroup,
  //                     Action:
  //                       data?.deviceLog[0]?.dataGroup === 'Data'
  //                         ? data?.deviceLog[0]?.dataGroup
  //                         : 'Atlas network position',
  //                     Data: data?.deviceLog[0].dataGroupAttributes.map(
  //                       (el) => ` ${el.attribute}: ${changeAttributeValue(el)}`
  //                     ),
  //                   };
  //                   return [second];
  //                 } else {
  //                   const msg = data?.deviceLog[0]?.dataGroupAttributes.splice(
  //                     0,
  //                     1
  //                   );
  //                   const first = {
  //                     Date: data?.time,
  //                     'Sequence #': data?.seqNumber,
  //                     Type: data?.deviceLog[0]?.dataGroup,
  //                     Action: msg[0]?.attribute,
  //                     Data: data?.deviceLog[0].dataGroupAttributes.map(
  //                       (el) => ` ${el.attribute}: ${changeAttributeValue(el)}`
  //                     ),
  //                   };
  //                   const second = {
  //                     Date: data?.time,
  //                     'Sequence #': data?.seqNumber,
  //                     Type: data?.deviceLog[1].dataGroup,
  //                     Action: 'Atlas network position',
  //                     Data: data?.deviceLog[1].dataGroupAttributes.map(
  //                       (el) => ` ${el.attribute}: ${el.attributeValue}`
  //                     ),
  //                   };
  //                   return [first, second];
  //                 }
  //               });
  //             })
  //           );
  //       })
  //     )
  //     .subscribe((data) => {
  //       this.loadingHistory = false;
  //       if (data.length === 0) {
  //         this.deviceHistoryData = [];
  //       } else {
  //         this.deviceHistoryData = data
  //           ?.reduce((prev, next) => {
  //             return prev.concat(next);
  //           })
  //           .reverse();
  //       }
  //     });
  // }
}
