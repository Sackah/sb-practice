import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TitleComponent implements OnInit {
  @Input() title!: SBTitle;
  @Output() titleTextChange = new EventEmitter<SBTitle>();

  editTitle = false;

  ngOnInit(): void {
    this.title.title.style.bold = true;
  }

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

  onTitleTextChange() {
    this.titleTextChange.emit(this.title);
  }

  get titleStyle() {
    return {
      title: true,
      'text-bold': this.title.title.style.bold,
      'text-italic': this.title.title.style.italic,
    };
  }

  get descriptionStyle() {
    return {
      desc: true,
      'text-bold': this.title.description.style.bold,
      'text-italic': this.title.description.style.italic,
    };
  }
}
