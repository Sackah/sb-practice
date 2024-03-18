import { Component, Input } from '@angular/core';
import { SurveyTemplate } from '../../../../../shared/types';

@Component({
  selector: 'app-admin-template-list',
  standalone: true,
  imports: [],
  templateUrl: './template-list.component.html',
  styleUrl: './template-list.component.scss',
})
export class TemplateListComponent {
  @Input({ required: true }) templates: SurveyTemplate[] = [];
}
