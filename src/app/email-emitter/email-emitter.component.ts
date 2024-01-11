import { Component } from '@angular/core';
import { SurveyCustomization2Service } from '../services/survey-customization2.service';

@Component({
  selector: 'app-email-emitter',
  standalone: true,
  imports: [],
  templateUrl: './email-emitter.component.html',
  styleUrl: './email-emitter.component.scss',
})
export class EmailEmitterComponent {
  constructor(private service: SurveyCustomization2Service) {}

  handleClick() {
    this.service.addForm('email');
  }
}
