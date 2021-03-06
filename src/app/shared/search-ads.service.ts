import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from './model/Response.model';
import { Parameter } from './model/parameter.model';
import { Observable, Subject } from 'rxjs';
import { Advertisement } from './model/Advertisement.model';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { PageFancount } from './model/page-fancount.model';
import { map } from 'rxjs/operators' ;

@Injectable({
  providedIn: 'root'
})
export class SearchAdsService {
  url='http://localhost:8080/birdads';
  httpParams:HttpParams; 
  listAdChange = new Subject<Advertisement[]>();
  codesArray= [];
  constructor(private httpClient: HttpClient, private dateformater: NgbDateParserFormatter) { }

  fetchAds(params) {
      return this.httpClient.get<Response>(this.url, 
        {params: params});
    
  }
  fetchAdsDefault(codes){
    this.httpParams = new HttpParams();
    this.httpParams = this.httpParams.append('ad_reached_countries', codes);
    return this.httpClient.get<Response>(this.url, 
      {params: this.httpParams});
  }
  fetchCountriesCodes() {
    return this.httpClient.get('https://restcountries.eu/rest/v2/all')
    .pipe(map( responseData => {
      const arrayCountries = []
      for(const key in responseData) {
          arrayCountries.push({name: responseData[key].name, alpha2Code: responseData[key].alpha2Code})
      }
      return arrayCountries;
    }))
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
  filterByLike(listads:Response, nbrLike: number){
      return listads.data.filter(
        ad => {
          return this.isNbrLikeExist(ad.page.fan_count, nbrLike)
        }
      )
  }
   isdateEquals(ad_delivery_date, date2){
     if(ad_delivery_date) {
       return ad_delivery_date.slice(0,10) === this.dateformater.format(date2);
     }
       return false;
   }

   isNbrLikeExist(nbr1, nbr2 ){
     if(nbr1) {
       return nbr1 >= nbr2
     }
     return false
   }
   fetchCode(countries) {
    return countries.map( 
      countrie => { 
        return countrie.alpha2Code
    });
  }
}
