import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.scss',
})
export class SideNavBarComponent {
  menus = [
    {
      id: 1,
      navName: 'Home',
      icon_link: '../../../assets/SideMenu/home_icon.svg',
      nav_link: '/admin/home',
    },
    {
      id: 2,
      navName: 'Template',
      icon_link: '../../../assets/SideMenu/template_icon.svg',
      nav_link: '/admin/most_popular',
    },
    {
      id: 3,
      navName: 'History',
      icon_link: '../../../assets/SideMenu/history_icon.svg',
      nav_link: '/user/history',
    },

    {
      id: 3,
      navName: 'Settings',
      icon_link: '../../../assets/SideMenu/settings_icon.svg',
      nav_link: '/admin/settings',
    },
  ];

  isMenuOpen: boolean = false;
  largeScreenMenuStatus: boolean = true;

  handleMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
