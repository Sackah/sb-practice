import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
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
  paginationParams = signal({
    currentPage: 1,
    total: 100,
    limit: 10,
  });
  totalPages = computed(() =>
    Math.ceil(this.paginationParams().total / this.paginationParams().limit)
  );

  ngOnInit() {
    this.fetchUsers();
  }

  prev() {
    if (this.userListSignal().pending) {
      return;
    }
    if (this.paginationParams().currentPage > 1) {
      this.paginationParams.set({
        ...this.paginationParams(),
        currentPage: this.paginationParams().currentPage - 1,
      });
    }
  }

  next() {
    if (this.userListSignal().pending) {
      return;
    }
    if (this.paginationParams().currentPage < this.totalPages()) {
      this.paginationParams.set({
        ...this.paginationParams(),
        currentPage: this.paginationParams().currentPage + 1,
      });
    }
  }

  pageChange(value: string | number) {
    if (this.userListSignal().pending) {
      return;
    }
    switch (value) {
      case '... ':
        this.paginationParams.set({
          ...this.paginationParams(),
          currentPage: 1,
        });
        this.fetchUsers();
        break;
      case ' ...':
        this.paginationParams.set({
          ...this.paginationParams(),
          currentPage: this.totalPages(),
        });
        this.fetchUsers();
        break;
      default:
        if (typeof value === 'number') {
          this.paginationParams.set({
            ...this.paginationParams(),
            currentPage: value,
          });
          this.fetchUsers();
        }
        break;
    }
  }

  fetchUsers() {
    const { currentPage, limit } = this.paginationParams();
    pendSignal(this.userListSignal);
    this.userActionsService
      .getUsers(currentPage, limit)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: (data) => {
          this.paginationParams.set({
            ...this.paginationParams(),
            total: data.totalPages,
          });
          completeSignal(this.userListSignal, data.users);
        },
        error: (err) => {
          errorSignal(this.userListSignal, err);
        },
      });
  }

  deleteUser(user: User) {
    pendSignal(this.deleteUserSignal);
    this.userActionsService
      .deleteUser(user.id)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: (res) => {
          const updatedUsers = this.userListSignal().data!.filter(
            (u) => u.id !== user.id
          );
          this.confirmDelete = false;
          console.log(res);
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
