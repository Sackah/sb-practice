import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { User } from '../../store/user';

export class ProfileValidator<T extends User = User> {
  private form: FormGroup;
  private user: T;

  constructor(form: FormGroup, user: T) {
    this.form = form;
    this.user = user;
  }

  get isValid() {
    let out: boolean = false;

    ['firstName', 'lastName', 'email', 'profilePicture'].forEach((name) => {
      const control = this.form.get(name);
      if (
        (control?.dirty || control?.touched) &&
        (control?.value as string).trim() !== this.user[name as keyof User]
      ) {
        out = true;
      }
    });

    return out;
  }
}

export function passwordMatchValidator(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordField);
    const confirmPassword = control.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  };
}
