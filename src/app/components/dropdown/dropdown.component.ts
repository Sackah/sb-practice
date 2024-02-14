import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';
import { SBOption } from '../../models/question.model';

@Component({
  selector: 'custom-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  isMenuOpen = false;
  selectedItem!: SBOption;
  @Input() options: SBOption[] = [];
  @Input() editable = false;
  @Output() createOption = new EventEmitter<boolean>();

  ngOnInit() {
    this.selectedItem = this.options[0];
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleSeletion(event: Event, option: SBOption) {
    if (this.editable) {
      event.stopPropagation();
    }
    this.isMenuOpen = false;
    this.selectedItem = option;
  }

  addOption() {
    this.createOption.emit(true);
  }
}
