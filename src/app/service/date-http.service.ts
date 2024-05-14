import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultDate } from '../model/date';
import { Response, StatusCode } from '../model/http';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class DateHttpService extends BaseHttpService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

    /**
   * List default start dates and end date for date params
   */
    defaultDatesParams(subdomain: string): Observable<DefaultDate[]> {
      const url = this.buildUrl(
        `company/company-date-parameter/companyId/${subdomain}`
      );
      return this.check(this.httpClient.get<Response<DefaultDate[]>>(url), [
        StatusCode.OK,
        StatusCode.SUCCESS,
      ]);
    }
}
