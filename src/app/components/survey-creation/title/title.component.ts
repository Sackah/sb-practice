import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SBTitle } from '../../../models/title.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../directives/clickoutside.directive';
import { BoldIconComponent } from '../icons/bold.component';
import { ItalicIconComponent } from '../icons/italic.component';
import { LargeIconComponent } from '../icons/large.component';

@Component({
  selector: 'app-title',
  standalone: true,
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', '../styles/text.styles.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideDirective,
    BoldIconComponent,
    ItalicIconComponent,
    LargeIconComponent,
  ],
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
      'text-base': true,
      'text-bold': this.title.title.style.bold,
      'text-italic': this.title.title.style.italic,
      'text-large': this.title.title.style.large,
    };
  }

  get descriptionStyle() {
    return {
      desc: true,
      'text-base': true,
      'text-bold': this.title.description.style.bold,
      'text-italic': this.title.description.style.italic,
      'text-large': this.title.description.style.large,
    };
  }
}
