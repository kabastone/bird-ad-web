import { TestBed } from '@angular/core/testing';

import { SearchAdsService } from './search-ads.service';

describe('SearchAdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchAdsService = TestBed.get(SearchAdsService);
    expect(service).toBeTruthy();
  });
});
