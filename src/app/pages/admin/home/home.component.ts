import { Component, OnInit, inject } from '@angular/core';
import { InviteUserModalComponent } from './components/invite-user-modal/invite-user-modal.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {
  completeSignal,
  errorSignal,
  newSignal,
  pendSignal,
} from '../../../shared/utils';
import { User } from '../../../store/user';
import { FetchUsersService } from '../../../services/admin/fetch-users.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [InviteUserModalComponent, UserListComponent],
})
export class AdminHomeComponent implements OnInit {
  isModalOpen = false;
  usersSignal = newSignal<User[]>();
  fetchUsersService = inject(FetchUsersService);

  ngOnInit() {
    pendSignal(this.usersSignal);
    this.fetchUsersService.get().subscribe({
      next: (data) => {
        completeSignal(this.usersSignal, data);
      },
      error: (err) => {
        errorSignal(this.usersSignal, err);
      },
    });
  }
}
