import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  completeSignal,
  errorSignal,
  newSignal,
  pendSignal,
} from '../../../../../shared/utils';
import { UserActionsService } from '../../../../../services/admin/user-actions.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-invite-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invite-user-modal.component.html',
  styleUrl: './invite-user-modal.component.scss',
})
export class InviteUserModalComponent implements OnDestroy {
  @Input({ required: true }) open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();
  userActionsService = inject(UserActionsService);
  destroyer$ = new Subject<void>();
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  signal = newSignal<{}>();
  validationErrors = '';

  close() {
    this.openChange.emit(!this.open);
  }

  getEmailErrors(): string {
    const control = this.form.get('email');
    return control?.invalid && (control.dirty || control.touched)
      ? control.hasError('required')
        ? 'This field is required'
        : control.hasError('email')
        ? 'Please enter a valid email address'
        : ''
      : '';
  }

  handleSubmit() {
    if (this.form.invalid) {
      this.validationErrors = this.getEmailErrors();
      return;
    }

    if (this.form.valid) {
      // TODO: remove console statement
      console.log(this.form.value);
      pendSignal(this.signal);
      this.userActionsService
        .inviteUser(this.form.value.email!)
        .pipe(takeUntil(this.destroyer$))
        .subscribe({
          next: (res) => {
            this.openChange.emit(!this.open);
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
