import { inject, Injectable } from '@angular/core';
import { FUEL_FORM_KEY, IFuel } from '@Core/interfaces/fuel';
import { from, Observable, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private sessionService = inject(SessionStorageService);

  getAllFuelList(): Observable<Array<IFuel>> {
    const data = this.sessionService.getFromSessionStorage(FUEL_FORM_KEY)

    return of(data);
  }

  updateFuel(fuel: IFuel) {}

  deleteFuel(id: number) {}
}
