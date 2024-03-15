import { Component, OnInit, inject } from '@angular/core';
import { User, user } from '../../../../../store/user';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileUpdateService } from '../../../../../services/admin/profile-update.service';
import {
  ProfileValidator,
  completeSignal,
  errorSignal,
  newSignal,
  pendSignal,
  FormCreator,
} from '../../../../../shared/utils';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class AdminProfileComponent implements OnInit {
  user: User & {
    firstName?: string;
    lastName?: string;
  } = user;
  form!: FormGroup;
  enableSubmission = false;
  private profileUpdateService = inject(ProfileUpdateService);
  updateProfileSignal = newSignal<{}>();
  profileValidator!: ProfileValidator;

  ngOnInit() {
    this.user.firstName = this.user.username.split(' ')[0];
    this.user.lastName = this.user.username.split(' ')[1];
    this.setupForm();
    this.listenForChanges();
    this.profileValidator = new ProfileValidator(this.form, this.user);
  }

  setupForm() {
    this.form = FormCreator.create(
      {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        profielPicture: this.user.profilePicture,
      },
      {
        disable: 'email',
      }
    );
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
          this.form.patchValue({
            profilePicture: loadEvent.target.result,
          });
          this.enableSubmission = true;
        }
      };
    }
  }

  listenForChanges() {
    this.form.valueChanges.subscribe(() => {
      this.enableSubmission = this.profileValidator.isValid;
    });
  }

  handleSubmit() {
    if (this.form.valid && this.enableSubmission) {
      pendSignal(this.updateProfileSignal);
      this.enableSubmission = false;

      this.profileUpdateService.post(this.form.value).subscribe({
        next: (re) => {
          completeSignal(this.updateProfileSignal, re);
          this.enableSubmission = true;
        },
        error: (err) => {
          errorSignal(this.updateProfileSignal, err);
          this.enableSubmission = true;
        },
      });
    }
  }
}
