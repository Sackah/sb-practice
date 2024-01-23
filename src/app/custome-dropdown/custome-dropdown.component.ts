import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custome-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custome-dropdown.component.html',
  styleUrl: './custome-dropdown.component.scss',
})
export class CustomeDropdownComponent {
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string = '';
  isOpen: boolean = false;

  @ViewChild('dropdown') dropdown: ElementRef | undefined;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.dropdown?.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
