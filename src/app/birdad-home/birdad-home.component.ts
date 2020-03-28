import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { SearchAdsService } from '../shared/search-ads.service';
import { Response } from '../shared/model/Response.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Parameter } from '../shared/model/parameter.model';
import { NgbDate, NgbModal, NgbCalendar, ModalDismissReasons, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { Advertisement } from '../shared/model/Advertisement.model';

@Component({
  selector: 'app-birdad-home',
  templateUrl: './birdad-home.component.html',
  styleUrls: ['./birdad-home.component.css']
})
export class BirdadHomeComponent implements OnInit, OnDestroy {
  nbrLike: number
  listeChangeSubject: Subscription;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  model = {
    left: true,
    middle: false,
    right: false
};

focus;
focus1;
focus2;
focus3;
focus4;
listads= new Response();
parameters = [];
searchTerms:string;
error: boolean;
countriesCode = [];
isEmptyList: boolean = false;
allCountriesCode:String[]=[];

  constructor(private searchAdService: SearchAdsService, 
    private route:ActivatedRoute,
    private router: Router,
    private modalService: NgbModal, calendar: NgbCalendar,
    private dateformater:NgbDateParserFormatter) { 
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
      
    }

    open(content, type, modalDimension) {
      if (modalDimension === 'sm' && type === 'modal_mini') {
          this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      } else if (modalDimension === '' && type === 'Notification') {
        this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } else {
          this.modalService.open(content,{ centered: true }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
      }
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }
  isActive(date: NgbDate){
    return date.equals(this.model1) || date.equals(this.model2);
  }
  endDateChanged(date){
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
      this.model1 = this.model2;
    }
  }
  startDateChanged(date){
    if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
      this.model2 = this.model1;
    }
  }
  ngOnInit() {
    this.searchAdService.fetchCountriesCodes().subscribe(
      response => {
      this.countriesCode = response;
      }
    );
    this.route.queryParams.subscribe(
      (params: Params) => {
        
         if(!params['ad_reached_countries'] && params['search_terms']){
            this.searchAdService.fetchCountriesCodes().subscribe(
            response => {
            this.countriesCode = response;
            this.allCountriesCode = this.searchAdService.fetchCode(this.countriesCode);
            this.allCountriesCode=this.allCountriesCode.slice(0,54);
            this.allCountriesCode.push(...['BR','GB','US'])
            this.router.navigate(['.'], {queryParams:{ad_reached_countries: this.allCountriesCode.join(',')}, queryParamsHandling:'merge'})
            //params = {search_terms: '""', ad_reached_countries: this.allCountriesCode.join(',')}; 
             /* this.searchAdService.fetchAds({ad_reached_countries: this.allCountriesCode.join(',')}).subscribe(
              response => this.listads= response
            )  */
             }  
          );
        } 
       // else{
         if(params['search_terms'] && params['ad_reached_countries']){
          this.searchAdService.fetchAds(params).subscribe(
            response => { 
              if (response) {
                this.listads.data = this.filterListAds(response, this.model1, this.model2, this.nbrLike)
               }
               if(this.listads.data.length == 0){
                 this.isEmptyList = !this.isEmptyList;
               }
               this.router.navigate(['.'])
            });    
         }
         
      });
  } 
  sendRequest() {
    let searchTermParam = (!this.searchTerms)? '""': this.searchTerms;
        this.router.navigate(['.'], {queryParams:{search_terms: searchTermParam}, queryParamsHandling:'merge'}) 
  }
  onStartDateSelection(event) {
      console.log(event);
      this.router.navigate(['.'], {
        queryParams:{start_date: this.dateformater.format(this.model1)}, 
        queryParamsHandling: 'merge'
      });
  }

  onStopDateSelection(event) {
    
    this.router.navigate(['.'], {
      queryParams:{stop_date: this.dateformater.format(this.model2)},
      queryParamsHandling: 'merge'
    });
}

onDateChange(d) {
  console.log(this.model1);
}
filterListAds(response ,dateStart, dateStop, nbrLike){
  if(dateStart || dateStop){
    return this.searchAdService.filterByDate(response, dateStart, dateStop);
  }
  if(nbrLike) {
    return this.searchAdService.filterByLike(response, nbrLike);
  }
  return response.data;
}
onNbrLikeChange() {
  this.router.navigate(['.'], {queryParams:{fan_count: this.nbrLike}, queryParamsHandling:'merge'})
} 

close(){
  this.error = !this.error;
}
close2(){
  this.isEmptyList = !this.isEmptyList;
}
  ngOnDestroy(): void {
    this.listeChangeSubject.unsubscribe;
  }
 
}
