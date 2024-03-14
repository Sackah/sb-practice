import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from '../../components/general/navigation-bar/navigation-bar.component';
import { SideNavBarComponent } from '../../components/general/side-nav-bar/side-nav-bar.component';

@Component({
  template: `
    <app-navigation-bar></app-navigation-bar>
    <app-side-nav-bar></app-side-nav-bar>
    <div id="root">
      <router-outlet></router-outlet>
    </div>
  `,
  selector: 'app-admin-main',
  styles: ``,
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, SideNavBarComponent],
})
export class AdminEntryComponent {
  constructor() {
    console.log('AdminMainComponent');
  }
}
