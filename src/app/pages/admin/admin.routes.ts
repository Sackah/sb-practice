import { Routes } from '@angular/router';
import { AdminEntryComponent } from './main.component';
import { AdminHomeComponent } from './home/home.component';
import { AdminHistoryComponent } from './history/history.component';
import { AdminTemplateComponent } from './template/template.component';
import { AdminSettingsComponent } from './settings/settings.component';
import { AdminProfileComponent } from './settings/components/profile/profile.component';
import { AdminPasswordComponent } from './settings/components/password/password.component';
import { AdminBillingComponent } from './settings/components/billing/billing.component';
import { AdminAccountHistoryComponent } from './settings/components/account-history/account-history.component';
import { AdminUsersComponent } from './users/users.component';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminEntryComponent,
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'users',
        component: AdminUsersComponent,
      },
      {
        path: 'template',
        component: AdminTemplateComponent,
      },
      {
        path: 'history',
        component: AdminHistoryComponent,
      },
      {
        path: 'settings',
        component: AdminSettingsComponent,
        children: [
          {
            path: 'profile',
            component: AdminProfileComponent,
          },
          {
            path: 'password',
            component: AdminPasswordComponent,
          },
          {
            path: 'billing',
            component: AdminBillingComponent,
          },
          {
            path: 'account-history',
            component: AdminAccountHistoryComponent,
          },
        ],
      },
    ],
  },
];
