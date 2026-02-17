export interface IFuel {
  id: number;
  type: FuelTypeEnum;
  startDate: Date;
  endDate: Date;
  price: number;
  unit: FuelPriceUnitEnum;
}

export enum FuelTypeEnum {
  Gasoline,
  Disel,
}

export const FuelTypeLabels: Record<FuelTypeEnum, string> = {
  [FuelTypeEnum.Gasoline]: 'Gasoline',
  [FuelTypeEnum.Disel]: 'Disel',
};

export enum FuelPriceUnitEnum {
  Liter,
  Gallon,
}

export const FuelUnitLabels: Record<FuelPriceUnitEnum, string> = {
  [FuelPriceUnitEnum.Liter]: 'Liter',
  [FuelPriceUnitEnum.Gallon]: 'Gallon',
};

export const FUEL_FORM_KEY = 'fuel-form';

export class Fuel implements IFuel {
  id: number = Math.random() * 10;
  type: FuelTypeEnum = FuelTypeEnum.Gasoline;
  startDate: Date = new Date();
  endDate: Date = new Date();
  price: number = 0;
  unit: FuelPriceUnitEnum = FuelPriceUnitEnum.Gallon;

  constructor(
    type: FuelTypeEnum,
    startDate: Date,
    endDate: Date,
    price: number,
    unit: FuelPriceUnitEnum,
  ) {
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.unit = unit;
  }
}
