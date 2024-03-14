import { Component } from '@angular/core';

@Component({
  template: `admin works!`,
  selector: 'app-admin-main',
  styles: ``,
  standalone: true,
})
export class AdminEntryComponent {
  constructor() {
    console.log('AdminMainComponent');
  }
}
