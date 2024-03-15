import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  @Input() check = false;
  @Input() disabled = false;
  @Output() checkChange = new EventEmitter<boolean>();

  handleChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.checkChange.emit(checked);
  }
}
