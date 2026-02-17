import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FuelTypeLabels, FuelUnitLabels, IFuel } from '@Core/interfaces/fuel';
import { IVehicle, VehicleTypeLabels } from '@Core/interfaces/vehicle';
import { FuelService } from '@Core/services/fuel.service';
import { VehicleService } from '@Core/services/vehicle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-report',
  imports: [AsyncPipe],
  providers: [FuelService, VehicleService],
  templateUrl: './vehicle-report.html',
  styleUrl: './vehicle-report.scss',
})
export class VehicleReport {
  private fuelService = inject(FuelService);
  private vehicleService = inject(VehicleService);

  protected FuelTypeLabelList = FuelTypeLabels;
  protected FuelUnitLabelList = FuelUnitLabels;
  protected VehicleTypeList = VehicleTypeLabels;

  vehicleList$!: Observable<Array<IVehicle>>;
  fuelList$!: Observable<Array<IFuel>>;

  ngOnInit(): void {
    this.vehicleList$ = this.vehicleService.getAllVehicleList();
    this.fuelList$ = this.fuelService.getAllFuelList();
  }

  edit(fuel: IFuel) {
    this.fuelService.updateFuel(fuel);
    this.fuelList$ = this.fuelService.getAllFuelList();
  }
}
