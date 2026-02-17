import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'fuel-report',
    loadComponent: () => import('./reports/fuel-report/fuel-report').then((c) => c.FuelReport),
  },
  {
    path: 'vehicle-report',
    loadComponent: () =>
      import('./reports/vehicle-report/vehicle-report').then((c) => c.VehicleReport),
  },
  {
    path: 'fuel-rate-report',
    loadComponent: () =>
      import('./reports/fuel-rate-report/fuel-rate-report').then((c) => c.FuelRateReport),
  },
  {
    path: 'fuel-form',
    loadComponent: () =>
      import('./feutures/fuel-form/fuel-form.component').then((c) => c.FuelFormComponent),
  },
  {
    path: 'fuel-form/:id',
    loadComponent: () =>
      import('./feutures/fuel-form/fuel-form.component').then((c) => c.FuelFormComponent),
  },
  {
    path: 'vehicle-form',
    loadComponent: () =>
      import('./feutures/vehicle-form/vehicle-form.component').then((c) => c.VehicleFormComponent),
  },
  {
    path: 'vehicle-form/:id',
    loadComponent: () =>
      import('./feutures/vehicle-form/vehicle-form.component').then((c) => c.VehicleFormComponent),
  },
  {
    path: 'fuel-rate-form',
    loadComponent: () =>
      import('./feutures/fuel-rate-form/fuel-rate-form').then((c) => c.FuelRateForm),
  },
  {
    path: 'fuel-rate-form/:id',
    loadComponent: () =>
      import('./feutures/fuel-rate-form/fuel-rate-form').then((c) => c.FuelRateForm),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
