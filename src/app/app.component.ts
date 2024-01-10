import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SBHeading } from './models/heading.model';
import { SBSection } from './models/section.model';
import { SBForm } from './models/form.model';
import { SBEmail } from './models/email.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  heading!: SBHeading;
  section!: SBSection;
  form!: SBForm;
  email!: SBEmail;

  addHeading() {
    this.heading = new SBHeading();
  }

  addSection() {
    this.section = new SBSection(this.email);
  }

  addEmail() {
    this.email = new SBEmail();
  }

  addForm() {
    this.form = new SBForm(
      { mainText: 'Form Title', subText: 'Lorem lorem lorem' },
      this.heading,
      this.section
    );

    console.log(this.form);
  }
}
