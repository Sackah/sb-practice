import { Component, Input } from '@angular/core';

@Component({
  selector: 'large-icon',
  standalone: true,
  template: ` <svg
    [class]="classes"
    xmlns="http://www.w3.org/2000/svg"
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
  >
    <path
      d="M22.2822 22.5H19.3525V16.4062H13.6396V22.5H10.71V8.28125H13.6396V14.043H19.3525V8.28125H22.2822V22.5Z"
      fill="#D0D5DD"
    />
  </svg>`,
  styleUrls: ['./icon-styles.scss'],
})
export class LargeIconComponent {
  @Input() checked: boolean = false;

  get classes() {
    return {
      'icon-checked': this.checked,
    };
  }
}
