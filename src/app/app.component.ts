import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SBHeading } from './models/heading.model';
import { SBSection } from './models/section.model';
import { SBForm } from './models/form.model';
import { SBEmail } from './models/email.model';
import { HeadingPickerComponent } from './components/heading-picker/heading-picker.component';
import { HeadingComponent } from './components/heading/heading.component';
import { EmailComponent } from './components/email/email.component';
import { SBName } from './models/name.model';
import { SBTitle } from './models/title.model';
import { TitleComponent } from './components/title/title.component';
import { SurveyCustomization2Service } from './services/survey-customization2.service';
import { EmailEmitterComponent } from './email-emitter/email-emitter.component';
import { SectionComponent } from './components/section/section.component';
import { SBMultiSelect } from './models/multiple-choice.model';
import { MultipleSelectComponent } from './components/multiple-select/multiple-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    HeadingComponent,
    EmailComponent,
    TitleComponent,
    EmailEmitterComponent,
    SectionComponent,
    MultipleSelectComponent,
  ],
})
export class AppComponent implements OnInit {
  headings: SBHeading[] = [];
  title!: SBTitle;
  sections: SBSection[] = [
    {
      questions: [],
      title: {
        mainText: 'Section 1',
        subText: 'Lorem lorem lorem lorem lorem',
      },
    },
  ];
  form!: SBForm;

  addSection() {
    this.sections.push(new SBSection([]));
  }

  addEmail() {
    this.sections[this.sections.length - 1].questions.push(new SBEmail());
  }

  addHeading() {
    this.headings.push(new SBHeading());
  }

  addMultiSelect() {
    this.sections[this.sections.length - 1].questions.push(new SBMultiSelect());
  }

  constructor(private service: SurveyCustomization2Service) {
    service.data.subscribe({
      next: (data) => {
        if (data === 'email') {
          this.addEmail();
        }
      },
    });
  }

  /**
   * Cases:
   */
  typeOfQuestion(question: any) {
    switch (question.type) {
      case 'email':
        return ['email', question as SBEmail] as const;
      case 'name':
        return ['name', question as SBName] as const;
      case 'multi-select':
        return ['multi-select', question as SBMultiSelect] as const;
      default:
        return ['unknown', question] as const;
    }
  }

  ngOnInit(): void {
    this.title = new SBTitle();
  }

  addForm() {
    this.form = new SBForm(this.title, this.headings, this.sections);

    console.log(this.form);
  }
}
