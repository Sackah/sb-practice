import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavigationBarComponent } from '../../components/general/navigation-bar/navigation-bar.component';
import { SideNavBarComponent } from './components/general/side-nav-bar/side-nav-bar.component';

@Component({
  template: `
    <app-navigation-bar></app-navigation-bar>
    <app-side-nav-bar></app-side-nav-bar>
    <div id="admin-root">
      <router-outlet></router-outlet>
    </div>
  `,
  selector: 'app-admin-main',
  styles: `
      #admin-root{
        padding-top: 64px;
        padding-left: 112px;
        min-height: 100vh;
        width: 100%;
      }
      @media (min-width: 1536px){
        #admin-root{
          padding-top: calc(64px + 48px);
        }
      }
  `,
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, SideNavBarComponent],
})
export class AdminEntryComponent {
  constructor(private router: Router) {
    this.router.navigate(['/admin/home']);
  }
}
