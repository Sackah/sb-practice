import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SBBlock } from '../../models/block.model';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';
import { SBQuestion } from '../../models/question.model';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [FormsModule, ClickOutsideDirective],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
})
export class BlockComponent {
  @Input() block!: SBBlock;
  @Output() textChange = new EventEmitter<SBBlock>();
  @Output() delete = new EventEmitter<string>();

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

  handleAdd() {
    this.block.questions = [
      ...this.block.questions,
      new SBQuestion('Untitled Question', 'paragraph'),
    ];
  }

  handleDelete() {
    this.delete.emit('delete');
  }
}
