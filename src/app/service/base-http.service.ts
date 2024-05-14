import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Exception, Response, StatusCode } from '../model/http';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(protected readonly httpClient: HttpClient) { }

    /**
   * Builds a full URL using information provided in environment config file
   * @param fragment 
   */
    protected buildUrl(fragment: string): string {
      return `${environment.apiServerEndpoint}/${fragment}`;
    }
  

  /**
   * Checks a given response for statuses considered to be errors and throws the necessary exceptions.
   * This method is here to 
   * @param response
   * @param successCodes If the call returns any of the status codes passed here, this method will assume that the request succeeded.
   */
  protected check<T>(response: Observable<Response<T>>, successCodes: StatusCode[] = [StatusCode.OK]): Observable<T> {
    return response.pipe(
      catchError((response: HttpErrorResponse) => {
        return throwError(new Error(response.message || response.statusText));
      }),
      map((payload) => {
        if (!successCodes.includes(payload.statusCode)) {
          throw new Exception(payload.statusCode);
        }
        return payload.response;
      }));
  }


}
