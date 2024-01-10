import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SBTitle } from '../../models/title.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  @Input() title!: SBTitle;
  @Output() titleTextChange = new EventEmitter<SBTitle>();

  onTitleTextChange() {
    this.titleTextChange.emit(this.title);
  }
}
