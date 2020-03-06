import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from './model/Response.model';
import { Parameter } from './model/parameter.model';
import { Observable, Subject } from 'rxjs';
import { Advertisement } from './model/Advertisement.model';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class SearchAdsService {
  url='http://localhost:8080/birdads';
  httpParams:HttpParams; 
  listAdChange = new Subject<Advertisement[]>();
  constructor(private httpClient: HttpClient, private dateformater: NgbDateParserFormatter) { }

  fetchAds(params) {
    
    return this.httpClient.get<Response>(this.url, 
      {params: params});
  }
  filterByDate(listads:Response, dateStart:NgbDate, dateStop:NgbDate){
    if(dateStart && dateStop){
      return listads.data.filter(
        ad => { 
          
            return this.isdateEquals(ad.ad_delivery_start_time, dateStart) && this.isdateEquals(ad.ad_delivery_stop_time, dateStop)
        }
      )
    }
    else if(dateStart){
      return listads.data.filter(
        ad => { 
          return this.isdateEquals(ad.ad_delivery_start_time, dateStart)
        }
      )
    }else if (dateStop){
      return listads.data.filter(
        ad => { 
          return this.isdateEquals(ad.ad_delivery_stop_time, dateStop)
        }
      )
    }
      return listads.data;
  }
   isdateEquals(ad_delivery_date, date2){
     if(ad_delivery_date && date2) {
       return ad_delivery_date.slice(0,10) === this.dateformater.format(date2);
     }
       return false;
   }
}
