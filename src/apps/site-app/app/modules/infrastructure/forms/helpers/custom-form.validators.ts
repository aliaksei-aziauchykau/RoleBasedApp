import { ValidatorFn, ValidationErrors, FormGroup } from "@angular/forms";

export const confirmedFieldValidator: (propertiesNamesToConfirmed: string[]) => ValidatorFn = (propertiesNamesToConfirmed: string[]): ValidatorFn =>
    (formGroup: FormGroup): ValidationErrors | null => {
        const controls = propertiesNamesToConfirmed.map(propertyName => formGroup.get(propertyName));
        const uniqueControls = [... new Set(controls.map(c => c.value))];
        const result = uniqueControls.length === 1 && propertiesNamesToConfirmed.length >= 2;
        return result ? null : { confirmedField: true };
};