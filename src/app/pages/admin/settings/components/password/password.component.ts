import { Component, OnDestroy, inject } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class AdminPasswordComponent implements OnDestroy {
  form = FormCreator.createPasswordForm(['password', 'confirmPassword'], {
    validators: passwordMatchValidator('password', 'confirmPassword'),
  });
  signal = newSignal<{}>();
  updatePasswordService = inject(ProfileUpdateService);
  destroyer$ = new Subject<void>();

  handleSubmit() {
    if (this.form.valid) {
      delete this.form.value['confirmPassword'];
      pendSignal(this.signal);
      this.updatePasswordService
        .postPassword(this.form.value as { password: string })
        .pipe(takeUntil(this.destroyer$))
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

  ngOnDestroy() {
    this.destroyer$.next();
  }
}
