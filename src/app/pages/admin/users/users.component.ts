import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { InviteUserModalComponent } from './components/invite-user-modal/invite-user-modal.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {
  completeSignal,
  errorSignal,
  newSignal,
  pendSignal,
} from '../../../shared/utils';
import { User } from '../../../store/user';
import { UserActionsService } from '../../../services/admin/user-actions.service';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [
    InviteUserModalComponent,
    UserListComponent,
    ConfirmDeleteModalComponent,
    PaginationComponent,
  ],
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  inviteUser = false;
  confirmDelete = false;
  userListSignal = newSignal<User[]>();
  deleteUserSignal = newSignal<{}>();
  userActionsService = inject(UserActionsService);
  destroyer$ = new Subject<void>();
  paginationParams = {
    currentPage: 1,
    total: 100,
    limit: 10,
  };
  totalPages = Math.ceil(
    this.paginationParams.total / this.paginationParams.limit
  );

  ngOnInit() {
    this.fetchUsers();
  }

  prev() {
    if (this.paginationParams.currentPage > 1) {
      this.paginationParams = {
        ...this.paginationParams,
        currentPage: this.paginationParams.currentPage - 1,
      };
    }
  }

  next() {
    if (this.paginationParams.currentPage < this.totalPages) {
      this.paginationParams = {
        ...this.paginationParams,
        currentPage: this.paginationParams.currentPage + 1,
      };
    }
  }

  pageChange(value: string | number) {
    switch (value) {
      case '... ':
        this.paginationParams = {
          ...this.paginationParams,
          currentPage: 1,
        };
        break;
      case ' ...':
        this.paginationParams = {
          ...this.paginationParams,
          currentPage: this.totalPages,
        };
        break;
      default:
        if (typeof value === 'number') {
          this.paginationParams = {
            ...this.paginationParams,
            currentPage: value,
          };
        }
        break;
    }
  }

  fetchUsers() {
    const offsetConstant = this.paginationParams.currentPage * 10 - 10;
    pendSignal(this.userListSignal);
    this.userActionsService
      .getUsers()
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: (data) => {
          completeSignal(this.userListSignal, data);
        },
        error: (err) => {
          errorSignal(this.userListSignal, err);
        },
      });
  }

  deleteUser(user: User) {
    setTimeout(() => {
      alert(`deleted ${user.username}`);
      this.confirmDelete = false;
    }, 3000);

    //TODO: remove deletion here
    const updatedUsers = this.userListSignal().data!.filter(
      (u) => u.id !== user.id
    );
    completeSignal(this.userListSignal, updatedUsers);
    //

    pendSignal(this.deleteUserSignal);
    this.userActionsService
      .deleteUser(user.id)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: (res) => {
          const updatedUsers = this.userListSignal().data!.filter(
            (u) => u.id !== user.id
          );
          completeSignal(this.userListSignal, updatedUsers);
          completeSignal(this.deleteUserSignal, res);
        },
        error: (err) => {
          errorSignal(this.deleteUserSignal, err);
        },
      });
  }

  ngOnDestroy() {
    this.destroyer$.next();
  }
}
