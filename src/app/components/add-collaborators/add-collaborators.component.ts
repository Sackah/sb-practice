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
  addedUsers: string[] = [];
  form;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email]),
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      console.log(this.form.value?.email);
      this.addedUsers.push(this.form.value?.email as string);
      this.form.reset();
    }
  }
}
