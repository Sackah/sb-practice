import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SBBlock } from '../../models/block.model';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';
import { SBQuestion } from '../../models/question.model';
import { DropdownService } from '../../dropdown/dropdown.service';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [FormsModule, ClickOutsideDirective, QuestionComponent],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
})
export class BlockComponent {
  @Input() block!: SBBlock;
  @Output() duplicateBlock = new EventEmitter<SBBlock>();
  @Output() deleteBlock = new EventEmitter<void>();

  constructor(
    private dropdownService: DropdownService,
    private viewContainerRef: ViewContainerRef
  ) {}

  editTitle = false;

  /**
   * This function is for toggling the edit state for the block title
   * @param e event
   */
  onEditTitle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        this.editTitle = !this.editTitle;
      }
    } else if (e instanceof MouseEvent) {
      this.editTitle = !this.editTitle;
    }
  }

  /**
   * Operations on the question list
   */
  handleAddQuestion() {
    this.block.questions = [
      ...this.block.questions,
      new SBQuestion('Untitled Question', 'paragraph'),
    ];
  }

  handleDeleteQuestion(index: number) {
    const newList = this.block.questions.filter((_, i) => i !== index);
    this.block.questions = [...newList];
  }

  handleDuplicateQuestion(event: SBQuestion, index: number) {
    const currentQuestion = JSON.parse(JSON.stringify(event));
    this.block.questions = [
      ...this.block.questions.slice(0, index + 1),
      currentQuestion,
      ...this.block.questions.slice(index + 1),
    ];
  }

  /**
   * Operations on the block itself
   */
  handleDeleteBlock() {
    this.deleteBlock.emit();
    this.dropdownService.close();
  }

  handleDuplicateBlock() {
    this.duplicateBlock.emit(this.block);
    this.dropdownService.close();
  }

  toggleDropdown(event: MouseEvent, template: TemplateRef<any>) {
    const position = {
      top: 20,
      left: -20,
    };
    this.dropdownService.open(template, this.viewContainerRef, position, event);
  }
}
