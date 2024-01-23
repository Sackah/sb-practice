import { Component, Input } from '@angular/core';

@Component({
  selector: 'italic-icon',
  standalone: true,
  template: ` <svg
    [class]="classes"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
  >
    <path
      d="M14 8.5V11.5H16.21L12.79 19.5H10V22.5H18V19.5H15.79L19.21 11.5H22V8.5H14Z"
      fill="#D0D5DD"
    />
  </svg>`,
  styleUrls: ['./icon-styles.scss'],
})
export class ItalicIconComponent {
  @Input() checked: boolean = false;

  get classes() {
    return {
      'icon-checked': this.checked,
    };
  }
}
