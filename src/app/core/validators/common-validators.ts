import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get(startKey)?.value;
    const end = group.get(endKey)?.value;

    if (!start || !end) return null;

    if (new Date(start) > new Date(end)) {
      return { invalidDateRange: true };
    }

    return null;
  };
}

export function notInPastValidator(dateKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(dateKey);

    if (!control?.value) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const value = new Date(control?.value);

    return value < today ? { dateInPast: true } : null;
  };
}

export function optionalDateRangeValidator(startKey: string, endKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get(startKey)?.value;
    const end = group.get(endKey)?.value;

    if (!start || !end) return null;

    if (new Date(start) > new Date(end)) {
      return { invalidFilterRange: true };
    }

    return null;
  };
}

export function notEqualValidator(disallowed: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === disallowed ? { invalidSelection: true } : null;
  };
}
