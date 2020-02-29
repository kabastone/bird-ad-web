import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from './model/Response.model';
import { Parameter } from './model/parameter.model';

@Injectable({
  providedIn: 'root'
})
export class SearchAdsService {
  url='http://localhost:8080/birdads';
  httpParams:HttpParams; 
  constructor(private httpClient: HttpClient) { }

  fetchAds(params) {
    
    return this.httpClient.get<Response>(this.url, 
      {params: params});
  }
}
