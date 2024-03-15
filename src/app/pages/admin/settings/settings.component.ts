import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class AdminSettingsComponent {
  constructor(private router: Router) {
    router.navigate(['/admin/settings/profile']);
  }
}
