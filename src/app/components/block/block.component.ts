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
  @Output() textChange = new EventEmitter<SBBlock>();
  @Output() deleteBlock = new EventEmitter<void>();

  constructor(
    private dropdownService: DropdownService,
    private viewContainerRef: ViewContainerRef
  ) {}

  editTitle = false;

  onEditTitle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        this.editTitle = !this.editTitle;
      }
    } else if (e instanceof MouseEvent) {
      this.editTitle = !this.editTitle;
    }
  }

  handelOutsideClick() {
    this.editTitle = false;
  }

  onTextChange() {
    this.textChange.emit(this.block);
  }

  handleAddQuestion() {
    this.block.questions = [
      ...this.block.questions,
      new SBQuestion('Untitled Question', 'paragraph'),
    ];
  }

  handleDeleteBlock() {
    this.deleteBlock.emit();
    this.dropdownService.close();
  }

  handleDeleteQuestion(index: number) {
    const newList = this.block.questions.filter((_, i) => i !== index);
    this.block.questions = [...newList];
  }

  toggleDropdown(event: MouseEvent, template: TemplateRef<any>) {
    const position = { top: event.clientY + 10, left: event.clientX + 10 };
    this.dropdownService.open(template, this.viewContainerRef, position);
  }
}
