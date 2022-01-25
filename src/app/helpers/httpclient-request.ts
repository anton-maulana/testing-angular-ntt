/*
  please read https://angular.io/guide/http
*/
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Query } from '../models/query';

export class HttpClientRequestHelper {
  static getRequest(
    body?: any,
    query?: Query,
    reportProgress?: boolean): {
      body?: any;
      headers?: HttpHeaders;
      observe?: any;
      params?: HttpParams | {
        [param: string]: string | string[];
      };
      responseType?: any;
      reportProgress?: boolean;
      withCredentials?: boolean;
    } {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();

    if (query) {
      if (query.page && query.perPage) {
        params = params.append('page', query.page.toString());
        params = params.append('perPage', query.perPage.toString());
      }
      if (query.sort)
        params = params.append('sort', query.sort);
      if (query.keywords)
        params = params.append('keywords', query.keywords);
      if (query.data) {
        Object.keys(query.data).forEach(key => {
          params = params.append(key, query.data[key]);
        });
      }
    }

    let res = {
      body: body,
      headers: headers,
      params: params,
      reportProgress: reportProgress || false,
      withCredentials: true,
      observe: 'body',
      responseType: 'json'
    }

    return res;
  }
}
