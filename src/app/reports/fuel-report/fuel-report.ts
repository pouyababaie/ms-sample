import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FuelTypeLabels, FuelUnitLabels, IFuel } from '@Core/interfaces/fuel';
import { FuelService } from '@Core/services/fuel.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fuel-report',
  imports: [AsyncPipe, DatePipe, CurrencyPipe],
  providers: [FuelService],
  templateUrl: './fuel-report.html',
  styleUrl: './fuel-report.scss',
})
export class FuelReport implements OnInit {
  private fuelService = inject(FuelService);

  protected FuelTypeLabelList = FuelTypeLabels;
  protected FuelUnitLabelList = FuelUnitLabels;

  fuelList$!: Observable<Array<IFuel>>;

  ngOnInit(): void {
    this.fuelList$ = this.fuelService.getAllFuelList();
  }

  edit(fuel: IFuel) {
    this.fuelService.updateFuel(fuel);

    this.fuelList$ = this.fuelService.getAllFuelList();
  }
}
