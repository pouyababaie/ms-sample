import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFuel } from '@Core/interfaces/fuel';
import { IVehicle } from '@Core/interfaces/vehicle';
import { FuelService } from '@Core/services/fuel.service';
import { VehicleService } from '@Core/services/vehicle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fuel-rate-form',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, FormsModule],
  providers: [VehicleService, FuelService],
  templateUrl: './fuel-rate-form.html',
  styleUrl: './fuel-rate-form.scss',
})
export class FuelRateForm implements OnInit {
  private vehicleService = inject(VehicleService);
  private fuelService = inject(FuelService);

  private selectedVehicle = signal<IVehicle | null>(null);
  selectedFuel = signal<IFuel | null>(null);

  vehicles$!: Observable<Array<IVehicle>>;
  fuels$!: Observable<Array<IFuel>>;

  consumedFuel = signal<number>(0);

  finalPaymentAmount = computed(() => {
    return this.consumedFuel() * (this.selectedFuel()?.price ?? 0);
  });

  ngOnInit(): void {
    this.fuels$ = this.fuelService.getAllFuelList();

    this.vehicles$ = this.vehicleService.getAllVehicleList();
  }

  selectVehicle(v: IVehicle) {
    this.selectedVehicle.update((old) => (old = v));
  }

  calculate() {}
}
