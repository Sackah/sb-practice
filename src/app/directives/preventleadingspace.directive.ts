import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventLeadingSpace]',
})
export class PreventLeadingSpaceDirective {
  @HostListener('keydown', ['$event'])
  preventLeadingSpace(event: KeyboardEvent): void {
    if (
      event.key === ' ' &&
      (event.target as HTMLInputElement).selectionStart === 0
    ) {
      event.preventDefault();
    }
  }
}
