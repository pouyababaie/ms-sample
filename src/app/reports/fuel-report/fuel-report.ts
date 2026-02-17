import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  private readonly fuelService = inject(FuelService);

  private readonly router = inject(Router);

  protected FuelTypeLabelList = FuelTypeLabels;
  protected FuelUnitLabelList = FuelUnitLabels;

  fuelList$!: Observable<Array<IFuel>>;

  ngOnInit(): void {
    this.fuelList$ = this.fuelService.getFuelList();
  }

  edit(fuelId: number) {
    this.router.navigate(['/fuel-form', fuelId]);
  }

  deleteFuel(fuelId: number) {
    this.fuelService.deleteFuel(fuelId);
    this.fuelList$ = this.fuelService.getFuelList();
  }
}
