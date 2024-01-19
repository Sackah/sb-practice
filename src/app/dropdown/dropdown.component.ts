import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClickOutsideDirective } from '../directives/clickoutside.directive';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ClickOutsideDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input() position?: { top: number; left: number };
  @Output() closeEvent = new EventEmitter<void>();

  close() {
    this.closeEvent.emit();
  }
}
