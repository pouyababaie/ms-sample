import { Component, inject } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Driver, IDriver } from '@Core/interfaces/driver';
import { FuelTypeEnum } from '@Core/interfaces/fuel';
import { Vehicle, VEHICLE_FORM_KEY, VehicleTypeEnum } from '@Core/interfaces/vehicle';
import { SessionStorageService } from '@Core/services/session-storage.service';
import { fuelTypeOptions, vehicleTypeOptions } from '@Utils/enum-func';

@Component({
  selector: 'app-vehicle-form',
  imports: [ReactiveFormsModule],
  providers: [SessionStorageService],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent {
  private sessionService = inject(SessionStorageService);

  vehicleTypeList = vehicleTypeOptions;
  fuelTypes = fuelTypeOptions;

  vehicleForm = new FormGroup<IVehicleForm>({
    initialFuel: new FormControl(),
    fuelType: new FormControl(),
    type: new FormControl(),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    driver: new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
    }),
  });

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

      this.sessionService.setInSessionStorage(VEHICLE_FORM_KEY, vehicle);
      this.reset();
    }
  }

  reset() {
    this.vehicleForm.reset();
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
