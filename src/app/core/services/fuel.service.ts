import { inject, Injectable } from '@angular/core';
import { FUEL_FORM_KEY, IFuel } from '@Core/interfaces/fuel';
import { from, Observable, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private sessionService = inject(SessionStorageService);

  getFuelList(): Observable<Array<IFuel>> {
    const data = this.sessionService.getCollection<IFuel>(FUEL_FORM_KEY) ?? [];
    return of(data);
  }

  getFuelById(fueldId: number): IFuel {
    const data = this.sessionService.getCollection<IFuel>(FUEL_FORM_KEY) ?? [];
    return data.filter((x) => x.id === fueldId)[0];
  }

  createFuel(fuel: IFuel) {
    this.sessionService.addToCollection(FUEL_FORM_KEY, fuel);
  }

  updateFuel(fuel: IFuel) {
    this.sessionService.updateInCollection(FUEL_FORM_KEY, fuel);
  }

  deleteFuel(id: number) {
    this.sessionService.removeFromCollection(FUEL_FORM_KEY, id);
  }
}
