import { Component, OnInit, Input } from '@angular/core';
import { SearchAdsService } from 'src/app/shared/search-ads.service';
import { Response } from 'src/app/shared/model/Response.model';
import { Advertisement } from 'src/app/shared/model/Advertisement.model';

@Component({
  selector: 'app-listad',
  templateUrl: './listad.component.html',
  styleUrls: ['./listad.component.css']
})
export class ListadComponent implements OnInit {
  @Input() ad= new Advertisement();
  constructor(private searchService: SearchAdsService) { 
    console.log('Response ' + this.ad);
  }

  ngOnInit() {
    
  }

}
