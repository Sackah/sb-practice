import { Component, OnInit } from '@angular/core';
import { user } from '../../../../../store/user';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class AdminProfileComponent implements OnInit {
  user = user;
  form!: FormGroup;

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.form = new FormGroup({
      firstName: new FormControl(
        {
          value: this.user.username.split(' ')[0],
          disabled: false,
        },
        [Validators.required]
      ),
      lastName: new FormControl(
        {
          value: this.user.username.split(' ')[1],
          disabled: false,
        },
        [Validators.required]
      ),
      email: new FormControl(
        {
          value: this.user.email,
          disabled: true,
        },
        [Validators.required]
      ),
      profilePicture: new FormControl({
        value: this.user.profilePicture || '',
        disabled: false,
      }),
    });
  }

  handleImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const image = target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (loadEvent: ProgressEvent<FileReader>) => {
        if (loadEvent.target?.result) {
          this.user.profilePicture = loadEvent.target.result as string;
        }
      };
    }
  }
}
