import { Component, Input } from '@angular/core';
import { SurveyTemplate } from '../../../../../shared/types';

@Component({
  selector: 'app-admin-templates-list',
  standalone: true,
  imports: [],
  templateUrl: './templates-list.component.html',
  styleUrl: './templates-list.component.scss',
})
export class TemplatesListComponent {
  @Input({ required: true }) templates: SurveyTemplate[] = [];
}
