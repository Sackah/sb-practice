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
