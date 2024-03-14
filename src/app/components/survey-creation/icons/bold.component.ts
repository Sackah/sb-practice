import { Component, Input } from '@angular/core';

@Component({
  selector: 'bold-icon',
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
      d="M19.6 15.29C20.57 14.62 21.25 13.52 21.25 12.5C21.25 10.24 19.5 8.5 17.25 8.5H11V22.5H18.04C20.13 22.5 21.75 20.8 21.75 18.71C21.75 17.19 20.89 15.89 19.6 15.29ZM14 11H17C17.83 11 18.5 11.67 18.5 12.5C18.5 13.33 17.83 14 17 14H14V11ZM17.5 20H14V17H17.5C18.33 17 19 17.67 19 18.5C19 19.33 18.33 20 17.5 20Z"
      fill="#D0D5DD"
    />
  </svg>`,
  styleUrls: ['./icon-styles.scss'],
})
export class BoldIconComponent {
  @Input() checked: boolean = false;

  get classes() {
    return {
      'icon-checked': this.checked,
    };
  }
}
