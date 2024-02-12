import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'add-collaborators',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-collaborators.component.html',
  styleUrl: './add-collaborators.component.scss',
})
export class AddCollaboratorsComponent {
  addedUsers: {
    email: string;
    canEdit: boolean;
  }[] = [];
  form;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email]),
      role: new FormControl('view'),
    });
  }

  handleSubmit() {
    const email = this.form.value?.email?.split(',')[0].trim() as string;
    let canEdit;
    if (this.form.value?.role === 'edit') {
      canEdit = true;
    } else {
      canEdit = false;
    }
    if (this.validate(email)) {
      this.addedUsers.push({
        email,
        canEdit,
      });
      this.form.reset();
      this.form.patchValue({
        email: '',
        role: 'view',
      });
    }
    console.log('added users', this.addedUsers);
  }

  handleChange(event: any) {
    if (event.data === ',') {
      this.handleSubmit();
    }
  }

  validate(text: string | undefined) {
    if (text) {
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);
    } else return;
  }

  deleteUser(user: { email: string; canEdit: boolean }) {
    const index = this.addedUsers.findIndex((us) => us.email === user.email);
    this.addedUsers.splice(index, 1);

    console.log(this.addedUsers);
  }
}
