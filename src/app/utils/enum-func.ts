import { FuelPriceUnitEnum, FuelTypeEnum } from '@Core/interfaces/fuel';
import { VehicleTypeEnum } from '@Core/interfaces/vehicle';

export const vehicleTypeOptions = Object.entries(VehicleTypeEnum)
  .filter(([key]) => isNaN(Number(key)))
  .map(([label, value]) => ({
    label,
    value: value as number,
  }));

export const fuelTypeOptions = Object.entries(FuelTypeEnum)
  .filter(([key]) => isNaN(Number(key)))
  .map(([label, value]) => ({
    label,
    value: value as number,
  }));

export const fuelPriceUnitOptions = Object.entries(FuelPriceUnitEnum)
  .filter(([key]) => isNaN(Number(key)))
  .map(([label, value]) => ({
    label,
    value: value as number,
  }));
