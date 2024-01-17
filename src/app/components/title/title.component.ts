import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SBTitle } from '../../models/title.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  @Input() title!: SBTitle;
  @Output() titleTextChange = new EventEmitter<SBTitle>();

  editTitle = false;

  onEditTitle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key === 'Enter') {
        this.editTitle = !this.editTitle;
      }
    } else if (e instanceof MouseEvent) {
      this.editTitle = !this.editTitle;
    }
  }

  handelOutsideClick() {
    this.editTitle = false;
  }

  onTitleTextChange() {
    this.titleTextChange.emit(this.title);
  }
}
