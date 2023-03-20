import { TestBed } from '@angular/core/testing';

import { StoreCitiesService } from './store-cities.service';

fdescribe('StoreCitiesService', () => {
  let service: StoreCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
