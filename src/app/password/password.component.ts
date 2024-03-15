import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UpdateUserProfileService } from '../../../../../../services/update-user-profile/update-user-profile.service';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PasswordComponent {
  constructor(private fb: FormBuilder, private toast: NgToastService) {}
  loader: boolean = false;

  userProfile = inject(UpdateUserProfileService);

  updateUserPassword = this.fb.group({
    password: ['', [Validators.required]],
    comfirmPassword: ['', [Validators.required]],
  });

  onSubmit() {
    if (
      this.updateUserPassword.getRawValue().comfirmPassword === '' &&
      this.updateUserPassword.getRawValue().password === ''
    ) {
      if (
        this.updateUserPassword.getRawValue().comfirmPassword !==
        this.updateUserPassword.getRawValue().password
      ) {
        this.toast.info({
          detail: 'PASSWORD',
          summary: 'Password Mismatch',
          duration: 2000,
        });
        return;
      }

      this.toast.info({
        detail: 'PASSWORD',
        summary: 'Empty Field',
        duration: 2000,
      });
      return;
      return;
    }

    this.loader = true;

    let new_password: string = this.updateUserPassword
      .getRawValue()
      .password?.trim()!;

    this.userProfile.updateUserPassword(new_password).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: res.successMessage,
          duration: 2000,
        });
        this.loader = false;
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.error.message,
          duration: 2000,
        });
        this.loader = false;
      },
    });
  }
}
