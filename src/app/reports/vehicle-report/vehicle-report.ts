import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FuelTypeLabels, FuelUnitLabels, IFuel } from '@Core/interfaces/fuel';
import { IVehicle, VehicleTypeLabels } from '@Core/interfaces/vehicle';
import { FuelService } from '@Core/services/fuel.service';
import { VehicleService } from '@Core/services/vehicle.service';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle-report',
  imports: [AsyncPipe, CommonModule, FormsModule],
  providers: [FuelService, VehicleService],
  templateUrl: './vehicle-report.html',
  styleUrl: './vehicle-report.scss',
})
export class VehicleReport {
  private readonly fuelService = inject(FuelService);
  private readonly vehicleService = inject(VehicleService);

  private readonly router = inject(Router);

  protected FuelTypeLabelList = FuelTypeLabels;
  protected FuelUnitLabelList = FuelUnitLabels;
  protected VehicleTypeList = VehicleTypeLabels;

  protected selectedVehicle = signal<number | null>(null);
  protected selectedFuelType = signal<number | null>(null);

  vehicleList$!: Observable<Array<IVehicle>>;
  fuelList$!: Observable<Array<IFuel>>;

  filteredVehicleList$!: Observable<IVehicle[]>;

  ngOnInit(): void {
    this.vehicleList$ = this.vehicleService.getVehicleList();
    this.fuelList$ = this.fuelService.getFuelList();

    this.filteredVehicleList$ = this.vehicleList$;
  }

  edit(vehicleId: number) {
    this.router.navigate(['/vehicle-form', vehicleId]);
  }

  deleteVehicle(vehicleId: number) {
    this.vehicleService.deleteVehicle(vehicleId);
    
    this.filteredVehicleList$ = this.vehicleService.getVehicleList();
  }

  protected onSelectedVehicleChange(vehicleId: number) {
    this.selectedVehicle.set(vehicleId);

    if (vehicleId === null) {
      this.filteredVehicleList$ = this.vehicleList$;
      return;
    }

    this.filteredVehicleList$ = this.vehicleList$.pipe(
      map((x) => x.filter((v) => v.id === vehicleId)),
    );
  }

  protected onFuelTypeChange(fuelTypeId: number) {
    this.selectedFuelType.set(fuelTypeId);

    if (fuelTypeId === null) {
      this.filteredVehicleList$ = this.vehicleList$;
      return;
    }
    this.filteredVehicleList$ = this.vehicleList$.pipe(
      map((x) => x.filter((v) => v.fuelType === fuelTypeId)),
    );
  }
}
