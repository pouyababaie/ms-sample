import { TestBed } from '@angular/core/testing';

import { FuelRateService } from './fuel-rate.service';

describe('FuelRateService', () => {
  let service: FuelRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
