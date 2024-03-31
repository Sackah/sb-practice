import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SurveyTemplate, Template } from '../../types';
import { ClickOutsideDirective } from '../../../directives/clickoutside.directive';

@Component({
  selector: 'app-admin-templates-list',
  standalone: true,
  imports: [ClickOutsideDirective],
  templateUrl: './templates-list.component.html',
  styleUrl: './templates-list.component.scss',
})
export class TemplatesListComponent {
  @Input({ required: true }) templates: SurveyTemplate[] = [];
  showDropDown: boolean[] = Array(10).fill(false);
  @Output() delete = new EventEmitter<SurveyTemplate>();
  @Output() deactivate = new EventEmitter<SurveyTemplate>();

  toggleDropdown(e: Event, index: number) {
    e.stopPropagation();
    this.showDropDown = this.showDropDown.map((b, i) =>
      i === index ? (b = !b) : (b = false)
    );
  }
}
