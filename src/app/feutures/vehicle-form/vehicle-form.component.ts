import { Component, inject, input, signal } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver, IDriver } from '@Core/interfaces/driver';
import { FuelTypeEnum } from '@Core/interfaces/fuel';
import { IVehicle, Vehicle, VEHICLE_FORM_KEY, VehicleTypeEnum } from '@Core/interfaces/vehicle';
import { SessionStorageService } from '@Core/services/session-storage.service';
import { VehicleService } from '@Core/services/vehicle.service';
import { notEqualValidator } from '@Core/validators/common-validators';
import { fuelTypeOptions, vehicleTypeOptions } from '@Utils/enum-func';
import { filter, map, NotFoundError } from 'rxjs';

@Component({
  selector: 'app-vehicle-form',
  imports: [ReactiveFormsModule],
  providers: [SessionStorageService],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent {
  private readonly vehicleService = inject(VehicleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly vehicleId = signal<number | undefined>(undefined);

  vehicleTypeList = vehicleTypeOptions;
  fuelTypes = fuelTypeOptions;

  vehicleForm = new FormGroup<IVehicleForm>({
    initialFuel: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0), notEqualValidator(-1)],
      nonNullable: true,
    }),
    fuelType: new FormControl<number>(-1, {
      validators: [Validators.required, notEqualValidator(-1)],
      nonNullable: true,
    }),
    type: new FormControl<number>(-1, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    driver: new FormGroup<IDriverForm>({
      firstName: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      lastName: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    }),
  });

  constructor() {
    this.route.params
      .pipe(
        filter((x) => x['id']),
        map((x) => Number(x['id'])),
      )
      .subscribe((res) => {
        if (typeof res === 'number') {
          this.vehicleId.set(res);
          const vehicle = this.vehicleService.getVehicleById(this.vehicleId()!);

          console.log(vehicle);

          this.vehicleForm.setValue({
            name: vehicle.name,
            type: vehicle.type,
            fuelType: vehicle.fuelType,
            initialFuel: vehicle.initialFuel,
            driver: {
              firstName: vehicle.driver.firstName,
              lastName: vehicle.driver.lastName,
            },
          });
        }
      });
  }

  submit() {
    if (this.vehicleForm.valid) {
      const formValue = this.vehicleForm.value;
      const vehicle = new Vehicle(
        formValue.name!,
        new Driver(formValue.driver?.firstName!, formValue.driver?.lastName!),
        formValue.type!,
        formValue.fuelType!,
        formValue.initialFuel!,
      );

      switch (this.vehicleId()) {
        case undefined:
        case null:
          this.vehicleService.createVehicle(vehicle);
          break;

        default:
          this.vehicleService.updateVehicle({ ...vehicle, id: this.vehicleId()! });
          break;
      }
    }
    this.cancel();
  }

  cancel() {
    this.vehicleForm.reset();
    this.router.navigate(['/']);
  }
}

interface IVehicleForm {
  name: FormControl<string>;
  driver: FormGroup<IDriverForm>;
  type: FormControl<VehicleTypeEnum>;
  fuelType: FormControl<FuelTypeEnum>;
  initialFuel: FormControl<number>;
}

interface IDriverForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  id?: FormControl<number>;
}
