import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFuel, FUEL_FORM_KEY, IFuelRate, FUEL_RATE_KEY } from '@Core/interfaces/fuel';
import { IVehicle, VEHICLE_FORM_KEY } from '@Core/interfaces/vehicle';
import { Observable, forkJoin, tap, map } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  private sessionService = inject(SessionStorageService);
  private http = inject(HttpClient);

  initialize(): Observable<void> {
    return forkJoin({
      fuels: this.http.get<IFuel[]>('fuels.json'),
      vehicles: this.http.get<IVehicle[]>('vehicles.json'),
      fuelRate: this.http.get<IFuelRate[]>('fuel-rate.json'),
    }).pipe(
      tap(({ fuels, vehicles, fuelRate }) => {
        this.initializeIfEmpty(FUEL_FORM_KEY, fuels);
        this.initializeIfEmpty(VEHICLE_FORM_KEY, vehicles);
      }),
      map(() => void 0),
    );
  }

  private initializeIfEmpty<T>(key: string, data: T[]): void {
    const existing = this.sessionService.getCollection<T>(key);

    if (!existing || existing.length === 0) {
      this.sessionService.setCollection(key, data);
    }
  }
}
