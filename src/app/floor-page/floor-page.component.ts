import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetService } from '../service/asset.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { SmartHomeDashboard } from '../model/asset';
import { SessionService } from '../service/session.service';
import { Subscription, concatMap, map } from 'rxjs';

@Component({
  selector: 'app-floor-page',
  templateUrl: './floor-page.component.html',
  styleUrls: ['./floor-page.component.scss'],
})
export class FloorPageComponent implements OnInit, OnDestroy {
  assetId: string;
  floors: SmartHomeDashboard[] = [];
  subscription: Subscription;

  constructor(
    private assetsDataService: AssetService,
    private readonly route: ActivatedRoute,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.assetId = this.route.snapshot.parent.paramMap.get('id');
    this.fetchFloor();
  }

  fetchFloor() {
    this.subscription = this.session.userData
      .pipe(
        concatMap((user) => {
          return this.assetsDataService
            .smartHomeDevice(user.userCompanyId, this.assetId)
            .pipe(
              map((res) => {
                this.floors = res;
                // console.log(this.floors);
              })
            );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
