import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export class FormCreator {
  public static create(
    fields: { [key: string]: string | undefined },
    disabledField?: {
      disable: string;
    }
  ) {
    const group: Record<string, FormControl> = {};
    for (const field in fields) {
      if (disabledField && field === disabledField.disable) {
        group[disabledField.disable] = new FormControl({
          value: fields[field] || '',
          disabled: true,
        });
      } else {
        group[field] = new FormControl(
          {
            value: fields[field] || '',
            disabled: false,
          },
          [Validators.required]
        );
      }
    }

    return new FormGroup(group);
  }

  public static createPasswordForm(
    fields: string[],
    extraValidators?: {
      [key: string]: ValidatorFn | ValidatorFn[] | null | undefined;
    }
  ) {
    const group: Record<string, FormControl> = {};
    for (const field of fields) {
      group[field] = new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]);
    }

    return new FormGroup(group, extraValidators);
  }
}
