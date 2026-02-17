import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelRateForm } from './fuel-rate-form';

describe('FuelRateForm', () => {
  let component: FuelRateForm;
  let fixture: ComponentFixture<FuelRateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelRateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelRateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
