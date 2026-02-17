import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuelTypeLabels, FuelUnitLabels, IFuelRate } from '@Core/interfaces/fuel';
import { FuelRateService } from '@Core/services/fuel-rate.service';
import { FuelService } from '@Core/services/fuel.service';
import { VehicleService } from '@Core/services/vehicle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fuel-rate-report',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './fuel-rate-report.html',
  styleUrl: './fuel-rate-report.scss',
})
export class FuelRateReport implements OnInit {
  private readonly fuelService = inject(FuelService);
  private readonly vehicleServiec = inject(VehicleService);
  private readonly fuelRateService = inject(FuelRateService);

  private readonly router = inject(Router);

  protected FuelTypeLabelList = FuelTypeLabels;
  protected FuelUnitLabelList = FuelUnitLabels;

  fuelRateList$!: Observable<Array<IFuelRate>>;

  ngOnInit(): void {
    this.fuelRateList$ = this.fuelRateService.getFuelRateList();
  }

  edit(fuelId: number) {
    this.router.navigate(['/fuel-rate-form', fuelId]);
  }

  deleteFuelRate(fuelRateId: number) {
    this.fuelRateService.deleteFuelRate(fuelRateId);
    this.fuelRateList$ = this.fuelRateService.getFuelRateList();
  }
}
