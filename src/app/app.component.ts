import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SBHeading } from './models/heading.model';
import { SBSection } from './models/section.model';
import { SBForm } from './models/form.model';
import { SBEmail } from './models/email.model';
import { HeadingPickerComponent } from './components/heading-picker/heading-picker.component';
import { HeadingComponent } from './components/heading/heading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    HeadingPickerComponent,
    HeadingComponent,
  ],
})
export class AppComponent {
  headings: SBHeading[] = [];
  section!: SBSection;
  form!: SBForm;
  email!: SBEmail;

  addSection() {
    this.section = new SBSection(this.email);
  }

  addEmail() {
    this.email = new SBEmail();
  }

  addHeading() {
    this.headings.push(new SBHeading());
  }

  addForm() {
    this.form = new SBForm(
      { mainText: 'Form Title', subText: 'Lorem lorem lorem' },
      this.headings,
      this.section
    );

    console.log(this.form);
  }
}
