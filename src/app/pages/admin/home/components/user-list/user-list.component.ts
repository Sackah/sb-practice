import { Component, Input } from '@angular/core';
import { User } from '../../../../../store/user';
import { SwitchComponent } from '../../../../../components/ui/switch/switch.component';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [SwitchComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @Input({ required: true }) users: User[] = [];

  getInitials(username: string) {
    const firstName = username.split(' ')[0];
    const lastName = username.split(' ')[1];

    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase() || ''}`;
  }
}
