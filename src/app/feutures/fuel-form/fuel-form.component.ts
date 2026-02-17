import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fuel, FuelPriceUnitEnum, FuelTypeEnum, IFuel } from '@Core/interfaces/fuel';
import { FuelService } from '@Core/services/fuel.service';
import { SessionStorageService } from '@Core/services/session-storage.service';
import { fuelPriceUnitOptions, fuelTypeOptions } from '@Utils/enum-func';
import { filter, map } from 'rxjs';
import { dateRangeValidator, notInPastValidator } from '@Core/validators/common-validators';

@Component({
  selector: 'app-fuel-form',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [SessionStorageService, DatePipe],
  templateUrl: './fuel-form.component.html',
  styleUrl: './fuel-form.component.scss',
})
export class FuelFormComponent {
  private readonly fuelService = inject(FuelService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly fuelId = signal<number | undefined>(undefined);

  private readonly datePipe = inject(DatePipe);
  fuelTypes = fuelTypeOptions;
  fuelPriceUnits = fuelPriceUnitOptions;

  fuelForm = new FormGroup<IFuelForm>(
    {
      endDate: new FormControl(new Date(), {
        validators: [Validators.required],
        nonNullable: true,
      }),
      price: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
      startDate: new FormControl<Date>(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      type: new FormControl<number | null>(null, [Validators.required]),
      unit: new FormControl<number | null>(null, [Validators.required]),
    },
    { validators: [dateRangeValidator('startDate', 'endDate'), notInPastValidator('startDate')] },
  );

  constructor() {
    this.route.params
      .pipe(
        filter((x) => !!x || x === 0),
        map((x) => Number(x['id'])),
      )
      .subscribe((res) => {
        if (typeof res === 'number') {
          this.fuelId.set(res);
          const fuel = this.fuelService.getFuelById(this.fuelId()!);

          this.fuelForm.setValue({
            endDate: fuel.endDate,
            startDate: fuel.startDate,
            price: fuel.price,
            type: fuel.type,
            unit: fuel.unit,
          });

          console.log(this.fuelForm.value);
        }
      });
  }

  submit() {
    if (this.fuelForm.valid) {
      const formValue = this.fuelForm.value;
      const fuel = new Fuel(
        formValue.type!,
        formValue.startDate!,
        formValue.endDate!,
        formValue.price!,
        formValue.unit!,
      );

      switch (this.fuelId()) {
        case undefined:
        case null:
          this.fuelService.createFuel(fuel);
          break;

        default:
          this.fuelService.updateFuel({ ...fuel, id: this.fuelId()! });
          break;
      }

      this.cancel();
    }
  }

  cancel() {
    this.fuelForm.reset();
    this.router.navigate(['/']);
  }
}

interface IFuelForm {
  endDate: FormControl<Date>;
  startDate: FormControl<Date>;
  price: FormControl<number | null>;
  type: FormControl<FuelTypeEnum | null>;
  unit: FormControl<FuelPriceUnitEnum | null>;
}
