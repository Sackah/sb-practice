import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SBSection } from '../../models/section.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() section!: SBSection;
  @Output() textChange = new EventEmitter<SBSection>();

  onTextChange() {
    this.textChange.emit(this.section);
  }
}
