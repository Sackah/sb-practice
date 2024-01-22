import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionType, SBQuestion } from '../../models/question.model';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';
import { FormsModule } from '@angular/forms';
import { LongpressDirective } from '../../directives/longpress.directive';
import { SelectComponent } from '../../select/select.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ClickOutsideDirective, FormsModule, SelectComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  @Input() question!: SBQuestion;
  @Output() addQuestion = new EventEmitter<void>();
  @Output() deleteQuestion = new EventEmitter<void>();
  @Output() duplicateQuestion = new EventEmitter<SBQuestion>();
  editable = false;

  handleAddQuestion() {
    this.addQuestion.emit();
  }

  handleDeleteQuestion() {
    this.deleteQuestion.emit();
  }

  handleDuplicateQuestion() {
    this.duplicateQuestion.emit(this.question);
  }

  handleTypeChange(event: QuestionType) {
    this.question.type = event;
    if (
      event === 'multiple-choice' ||
      event === 'checkbox' ||
      event === 'dropdown'
    ) {
      this.question.options = ['option 1'];
    }
  }

  /**
   * Operations on option
   */
  addOption() {
    this.question.options.push(`option ${this.question.options.length + 1}`);
  }
}
