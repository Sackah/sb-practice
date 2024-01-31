import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionType, SBQuestion } from '../../models/question.model';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';
import { FormsModule } from '@angular/forms';
import { LongpressDirective } from '../../directives/longpress.directive';
import { SelectComponent } from '../../select/select.component';
import { BoldIconComponent } from '../icons/bold.component';
import { ItalicIconComponent } from '../icons/italic.component';
import { LargeIconComponent } from '../icons/large.component';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-question',
  standalone: true,
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss', '../styles/text.styles.scss'],
  imports: [
    ClickOutsideDirective,
    FormsModule,
    SelectComponent,
    BoldIconComponent,
    ItalicIconComponent,
    LargeIconComponent,
    DropdownComponent,
  ],
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

  get titleStyle() {
    return {
      title: true,
      'text-base': true,
      'text-bold': this.question.title.style.bold,
      'text-italic': this.question.title.style.italic,
      'text-large': this.question.title.style.large,
    };
  }

  /**
   * Operations on option
   */
  addOption() {
    this.question.options.push(`option ${this.question.options.length + 1}`);
  }
}
