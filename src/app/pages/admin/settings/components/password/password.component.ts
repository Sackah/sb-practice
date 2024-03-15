import { Component, inject } from '@angular/core';
import {
  FormCreator,
  completeSignal,
  errorSignal,
  newSignal,
  passwordMatchValidator,
  pendSignal,
} from '../../../../../shared/utils';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileUpdateService } from '../../../../../services/admin/profile-update.service';

@Component({
  selector: 'app-admin-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class AdminPasswordComponent {
  form = FormCreator.createPasswordForm(['password', 'confirmPassword'], {
    validators: passwordMatchValidator('password', 'confirmPassword'),
  });
  signal = newSignal<{}>();
  updatePasswordService = inject(ProfileUpdateService);

  handleSubmit() {
    if (this.form.valid) {
      delete this.form.value['confirmPassword'];
      pendSignal(this.signal);
      this.updatePasswordService
        .postPassword(this.form.value as { password: string })
        .subscribe({
          next: (res) => {
            completeSignal(this.signal, res);
          },
          error: (err) => {
            errorSignal(this.signal, err);
          },
        });
    }
  }
}
