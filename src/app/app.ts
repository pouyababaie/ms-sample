import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FUEL_FORM_KEY } from '@Core/interfaces/fuel';
import { VEHICLE_FORM_KEY } from '@Core/interfaces/vehicle';
import { SessionStorageService } from '@Core/services/session-storage.service';
import { exhaustMap, forkJoin, from, mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  providers: [SessionStorageService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private sessionStorageService = inject(SessionStorageService);
  private _http = inject(HttpClient);
  constructor() {
    const fuels = this._http.get<any[]>('fuels.json').pipe(
      tap((res) => {
        this.checkForInitialFuelList(res);
      }),
    );

    const vehicles = this._http.get<any[]>('vehicles.json').pipe(
      tap((res) => {
        this.checkFormInitialVehicleList(res);
      }),
    );

    forkJoin({ fuels: fuels, vehicles: vehicles }).subscribe((res) => {});
  }

  private checkForInitialFuelList(res: any[]) {
    const value = sessionStorage.getItem(FUEL_FORM_KEY);

    const hasValue = !!this.sessionStorageService.isJsonString(value);

    if (!hasValue)
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        this.sessionStorageService.setInSessionStorage(FUEL_FORM_KEY, element);
      }
  }

  private checkFormInitialVehicleList(res: any[]) {
    const value = sessionStorage.getItem(VEHICLE_FORM_KEY);

    const hasValue = !!this.sessionStorageService.isJsonString(value);

    if (!hasValue)
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        this.sessionStorageService.setInSessionStorage(VEHICLE_FORM_KEY, element);
      }
  }
}
