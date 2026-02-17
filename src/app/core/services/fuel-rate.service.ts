import { inject, Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { Observable, of } from 'rxjs';
import { FUEL_RATE_KEY, IFuelRate } from '@Core/interfaces/fuel';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root',
})
export class FuelRateService {
  private readonly sessionService = inject(SessionStorageService);
  private readonly vehicleService = inject(VehicleService);
  getFuelRateList(): Observable<Array<IFuelRate>> {
    const data = this.sessionService.getCollection<IFuelRate>(FUEL_RATE_KEY) ?? [];
    return of(data);
  }

  getFuelById(fueldId: number): IFuelRate {
    const data = this.sessionService.getCollection<IFuelRate>(FUEL_RATE_KEY) ?? [];
    return data.filter((x) => x.id === fueldId)[0];
  }

  createFuelRate(fuelRate: IFuelRate): void {
    this.sessionService.addToCollection<IFuelRate>(FUEL_RATE_KEY, fuelRate);

    const vehicle = this.vehicleService.getVehicleById(fuelRate.vehicle.id);

    vehicle.initialFuel = 0;

    this.vehicleService.updateVehicle(vehicle);
  }

  updateFuelRate(fuelRate: IFuelRate): void {
    this.sessionService.updateInCollection<IFuelRate>(FUEL_RATE_KEY, fuelRate);
  }

  deleteFuelRate(id: number): void {
    this.sessionService.removeFromCollection<IFuelRate>(FUEL_RATE_KEY, id);
  }
}
