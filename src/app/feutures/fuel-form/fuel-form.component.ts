import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FUEL_FORM_KEY, FuelPriceUnitEnum, FuelTypeEnum } from '@Core/interfaces/fuel';
import { SessionStorageService } from '@Core/services/session-storage.service';
import { fuelPriceUnitOptions, fuelTypeOptions } from '@Utils/enum-func';

@Component({
  selector: 'app-fuel-form',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [SessionStorageService],
  templateUrl: './fuel-form.component.html',
  styleUrl: './fuel-form.component.scss',
})
export class FuelFormComponent {
  private sessionService = inject(SessionStorageService);

  fuelTypes = fuelTypeOptions;
  fuelPriceUnits = fuelPriceUnitOptions;

  fuelForm = new FormGroup<IFuelForm>({
    endDate: new FormControl(),
    price: new FormControl(),
    startDate: new FormControl(),
    type: new FormControl(),
    unit: new FormControl(),
  });

  submit() {
    if (this.fuelForm.valid) {
      this.sessionService.setInSessionStorage(FUEL_FORM_KEY, this.fuelForm.value);
      this.reset();
    }
  }

  reset() {
    this.fuelForm.reset();
  }
}

interface IFuelForm {
  endDate: FormControl<Date>;
  price: FormControl<number>;
  startDate: FormControl<Date>;
  type: FormControl<FuelTypeEnum>;
  unit: FormControl<FuelPriceUnitEnum>;
}
