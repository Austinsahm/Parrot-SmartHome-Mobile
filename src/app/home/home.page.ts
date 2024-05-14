import { Component } from '@angular/core';
import { AssetService } from '../service/asset.service';
import { Asset } from '../model/asset';
import { SessionService } from '../service/session.service';
import { Observable, concatMap, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  assets$: Observable<Asset[]>;
  assets: Asset[] = [];

  constructor(
    private assetsDataService: AssetService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    // this.fetchAssets();

    this.assets$ = this.fetchAssets();
  }

  fetchAssets() {
    // this.assetsDataService.getAssetList('abcltd').subscribe((res) => {
    //   this.assets = res.filter((asset) => asset.assetType === 'Building');
    //   console.log(res);
    // });

    return this.session.userData.pipe(
      concatMap((user) => {
        return this.assetsDataService
          .getAssetList(user.userCompanyId)
          .pipe(
            map((assets) =>
              assets.filter((asset) => asset.assetType === 'Building')
            )
          );
      })
    );
  }

  selectAsset(asset) {}

  refresh(evt) {
    this.assets$ = this.fetchAssets();
    // TODO STOP RELOADING ARROW
  }
}
