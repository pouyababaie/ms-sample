import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelRateReport } from './fuel-rate-report';

describe('FuelRateReport', () => {
  let component: FuelRateReport;
  let fixture: ComponentFixture<FuelRateReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelRateReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelRateReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
