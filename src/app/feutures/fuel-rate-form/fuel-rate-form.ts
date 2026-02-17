import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuelRate, FuelTypeLabels, FuelUnitLabels, IFuel } from '@Core/interfaces/fuel';
import { IVehicle, VehicleTypeLabels } from '@Core/interfaces/vehicle';
import { FuelRateService } from '@Core/services/fuel-rate.service';
import { FuelService } from '@Core/services/fuel.service';
import { VehicleService } from '@Core/services/vehicle.service';
import { optionalDateRangeValidator } from '@Core/validators/common-validators';
import { combineLatest, filter, map, Observable, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-fuel-rate-form',
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, FormsModule],
  providers: [VehicleService, FuelService],
  templateUrl: './fuel-rate-form.html',
  styleUrl: './fuel-rate-form.scss',
})
export class FuelRateForm implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  private readonly fuelService = inject(FuelService);
  private readonly fuelRateService = inject(FuelRateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly FuelTypeLabelList = FuelTypeLabels;
  readonly FuelUnitLabelList = FuelUnitLabels;
  readonly VehicleTypeLabelList = VehicleTypeLabels;

  readonly fuelRateId = signal<number | null>(null);

  private readonly vehicleList$!: Observable<Array<IVehicle>>;
  private readonly fuelList$!: Observable<Array<IFuel>>;

  filteredVehicleList$!: Observable<Array<IVehicle>>;
  filteredFuelTypeList$!: Observable<Array<IFuel>>;

  fuelRateForm = new FormGroup<IFuelRateForm>(
    {
      fuel: new FormControl<IFuel | null>(null, [Validators.required]),
      fuelUsage: new FormControl<number>(0, [Validators.required]),
      vehicle: new FormControl<IVehicle | null>(null, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      startDateFilter: new FormControl(),
      endDateFilter: new FormControl(),
    },
    { validators: [optionalDateRangeValidator('startDateFilter', 'endDateFilter')] },
  );

  constructor() {
    this.route.params
      .pipe(
        map((x) => Number(x['id'])),
        filter((x) => !!x),
      )
      .subscribe((res) => {
        if (typeof res === 'number') {
          this.fuelRateId.set(res);
          const fuelRate = this.fuelRateService.getFuelById(this.fuelRateId()!);

          this.fuelRateForm.setValue({
            fuel: fuelRate.fuel,
            fuelUsage: fuelRate.fuelUsage,
            vehicle: fuelRate.vehicle,
            endDateFilter: this.fuelRateForm.controls.endDateFilter.value,
            startDateFilter: this.fuelRateForm.controls.startDateFilter.value,
          });
        }
      });

    this.vehicleList$ = this.vehicleService.getVehicleList();
    this.fuelList$ = this.fuelService.getFuelList();
  }
  ngOnInit(): void {
    this.initializeLists();
  }

  submit() {
    if (this.fuelRateForm.valid) {
      const formValue = this.fuelRateForm.value;
      const fuelRate = new FuelRate(formValue.vehicle!, formValue.fuel!, formValue.fuelUsage!);

      console.log(fuelRate);

      switch (this.fuelRateId()) {
        case undefined:
        case null:
          this.fuelRateService.createFuelRate(fuelRate);
          break;

        default:
          this.fuelRateService.updateFuelRate({ ...fuelRate, id: this.fuelRateId()! });
          break;
      }
    }

    this.cancel();
  }

  cancel() {
    this.fuelRateForm.reset();
    this.router.navigate(['/']);
  }

  private initializeLists() {
    this.filteredVehicleList$ = this.vehicleList$;

    this.filteredFuelTypeList$ = combineLatest([
      this.fuelList$,
      this.fuelRateForm.controls.vehicle.valueChanges.pipe(
        startWith(this.fuelRateForm.controls.vehicle.value),
      ),
    ]).pipe(
      map(([fuels, vehicle]) => {
        if (!vehicle) return fuels;

        return fuels.filter((f) => f.type === vehicle.fuelType);
      }),
    );
  }
}

interface IFuelRateForm {
  vehicle: FormControl<IVehicle | null>;
  fuel: FormControl<IFuel | null>;
  fuelUsage: FormControl<number | null>;
  startDateFilter: FormControl<Date>;
  endDateFilter: FormControl<Date>;
}
