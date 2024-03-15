import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-invite-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invite-user-modal.component.html',
  styleUrl: './invite-user-modal.component.scss',
})
export class InviteUserModalComponent {
  @Input({ required: true }) open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  close() {
    this.open = false;
    this.openChange.emit(this.open);
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
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
