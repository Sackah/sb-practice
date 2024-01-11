import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SBEmail } from '../../models/email.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.scss',
})
export class EmailComponent {
  @Input() email!: SBEmail | any;
  @Output() emailTextChange = new EventEmitter<SBEmail>();

  onEmailTextChange() {
    this.emailTextChange.emit(this.email);
  }
}
