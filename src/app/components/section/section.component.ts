import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SBBlock } from '../../models/block.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() block!: SBBlock;
  @Output() textChange = new EventEmitter<SBBlock>();

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
}
