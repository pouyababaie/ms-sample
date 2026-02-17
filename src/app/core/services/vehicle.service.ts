import { inject, Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { IVehicle, VEHICLE_FORM_KEY } from '@Core/interfaces/vehicle';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private sessionService = inject(SessionStorageService);

  getAllVehicleList(): Observable<Array<IVehicle>> {
    const data = this.sessionService.getFromSessionStorage(VEHICLE_FORM_KEY);

    return of(data);
  }

  updateVehicle(vehicle: IVehicle) {
    
  }

  deleteVehicle(id: number) {}
}
