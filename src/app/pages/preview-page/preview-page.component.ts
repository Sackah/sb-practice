import { Component, Input } from '@angular/core';
import { SBForm } from '../../models/form.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-page.component.html',
  styleUrl: './preview-page.component.scss',
})
export class PreviewPageComponent {
  @Input() form!: SBForm;

  get titleStyle() {
    return {
      title: true,
      'text-base': true,
      'text-bold': this.form.title.title.style.bold,
      'text-italic': this.form.title.title.style.italic,
      'text-large': this.form.title.title.style.large,
    };
  }

  get descriptionStyle() {
    return {
      desc: true,
      'text-base': true,
      'text-bold': this.form.title.description.style.bold,
      'text-italic': this.form.title.description.style.italic,
      'text-large': this.form.title.description.style.large,
    };
  }

  // get uniqueId(optionName: string, questionIndex: number){

  // }
}
