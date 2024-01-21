import { Component, EventEmitter } from '@angular/core';
import { ClickOutsideDirective } from '../directives/clickoutside.directive';
import { QuestionType } from '../models/question.model';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ClickOutsideDirective, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  isMenuOpen = false;
  selection = new BehaviorSubject<QuestionType>('multiple-choice');
  selectionObservable = this.selection.asObservable();
  selectedItem!: string;

  ngOnInit() {
    this.selectedItem = 'Multiple Choice';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  clickedOutside() {
    this.isMenuOpen = false;
  }

  handleSeletion(event: Event, item: QuestionType) {
    event.stopPropagation();
    this.isMenuOpen = false;
    this.selection.next(item);
    this.selectionObservable.subscribe((item) => {
      switch (item) {
        case 'multiple-choice':
          /**
           * So inside these individual cases you can emit some event that the question component
           * can listen to and updated/add the question type.
           */
          this.selectedItem = 'Multiple Choice';
          break;
        case 'checkbox':
          this.selectedItem = 'Checkboxes';
          break;
        case 'dropdown':
          this.selectedItem = 'Dropdown';
          break;
        case 'paragraph':
          this.selectedItem = 'Paragraph';
          break;
        case 'short-text':
          this.selectedItem = 'Short text';
          break;
        default:
          break;
      }
    });
  }
}
