import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SBHeading } from '../../models/heading.model';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss',
})
export class HeadingComponent {
  // @Input() headingText = '';
  @Input() heading!: SBHeading;
  @Output() headingTextChange = new EventEmitter<SBHeading>();

  onheadingTextChange() {
    this.headingTextChange.emit(this.heading);
  }
}
