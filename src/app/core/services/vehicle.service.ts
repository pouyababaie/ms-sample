import { inject, Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { IVehicle, VEHICLE_FORM_KEY } from '@Core/interfaces/vehicle';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private sessionService = inject(SessionStorageService);

  getVehicleList(): Observable<Array<IVehicle>> {
    const data = this.sessionService.getCollection<IVehicle>(VEHICLE_FORM_KEY) ?? [];
    return of(data);
  }

  getVehicleById(vehicleId: number): IVehicle {
    const data = this.sessionService.getCollection<IVehicle>(VEHICLE_FORM_KEY) ?? [];
    return data.filter((x) => x.id === vehicleId)[0];
  }

  createVehicle(vehicle: IVehicle) {
    this.sessionService.addToCollection(VEHICLE_FORM_KEY, vehicle);
  }

  updateVehicle(vehicle: IVehicle) {
    this.sessionService.updateInCollection(VEHICLE_FORM_KEY, vehicle);
  }

  deleteVehicle(id: number) {
    this.sessionService.removeFromCollection(VEHICLE_FORM_KEY, id);
  }
}
