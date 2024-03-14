import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../../directives/clickoutside.directive';
import { QuestionType } from '../../../models/question.model';
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
  @Output() selectionChange = new EventEmitter<QuestionType>();
  @Input() questionType!: QuestionType;

  ngOnInit() {
    switch (this.questionType) {
      case 'multiple-choice':
        this.selectedItem = 'Multiple Choice';
        break;
      case 'checkbox':
        this.selectedItem = 'Checkboxes';
        break;
      case 'single-choice':
        this.selectedItem = 'Single Choice';
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
        this.selectedItem = 'Multiple Choice';
        break;
    }
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
          this.selectedItem = 'Multiple Choice';
          this.selectionChange.emit(item);
          break;
        case 'checkbox':
          this.selectedItem = 'Checkboxes';
          this.selectionChange.emit(item);
          break;
        case 'single-choice':
          this.selectedItem = 'Single Choice';
          this.selectionChange.emit(item);
          break;
        case 'dropdown':
          this.selectedItem = 'Dropdown';
          this.selectionChange.emit(item);
          break;
        case 'paragraph':
          this.selectedItem = 'Paragraph';
          this.selectionChange.emit(item);
          break;
        case 'short-text':
          this.selectedItem = 'Short text';
          this.selectionChange.emit(item);
          break;
        default:
          break;
      }
    });
  }
}
