import { Driver, IDriver } from './driver';
import { FuelTypeEnum } from './fuel';

export interface IVehicle {
  id: number;
  name: string;
  driver: IDriver;
  type: VehicleTypeEnum;
  fuelType: FuelTypeEnum;
  initialFuel: number;
}

export enum VehicleTypeEnum {
  Sedan,
  Trailer,
}

export const VehicleTypeLabels: Record<VehicleTypeEnum, string> = {
  [VehicleTypeEnum.Sedan]: 'Sedan',
  [VehicleTypeEnum.Trailer]: 'Trailer',
};

export const VEHICLE_FORM_KEY = 'vehicle-form';

export class Vehicle implements IVehicle {
  id: number = Math.random() * 50;
  name: string = '';
  driver: IDriver = new Driver('', '');
  type: VehicleTypeEnum = VehicleTypeEnum.Sedan;
  fuelType: FuelTypeEnum = FuelTypeEnum.Gasoline;
  initialFuel: number = 0;
  constructor(
    name: string,
    driver: IDriver,
    type: VehicleTypeEnum,
    fuelType: FuelTypeEnum,
    initialFuel: number,
  ) {
    this.name = name;
    this.driver = driver;
    this.type = type;
    this.fuelType = fuelType;
    this.initialFuel = initialFuel;
  }
}
