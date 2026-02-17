import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelReport } from './fuel-report';

describe('FuelReport', () => {
  let component: FuelReport;
  let fixture: ComponentFixture<FuelReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
