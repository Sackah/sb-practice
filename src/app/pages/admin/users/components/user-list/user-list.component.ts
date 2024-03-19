import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  WritableSignal,
  inject,
} from '@angular/core';
import { SwitchComponent } from '../../../components/ui/switch/switch.component';
import { FormsModule } from '@angular/forms';
import {
  completeSignal,
  errorSignal,
  getInitials,
  newSignal,
  pendSignal,
} from '../../../../../shared/utils';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { UserActionsService } from '../../../../../services/admin/user-action/user-actions.service';
import { RouterLink } from '@angular/router';
import { ApiSignal, User } from '../../../../../shared/types';
import { Subject, takeUntil } from 'rxjs';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [
    SwitchComponent,
    FormsModule,
    ClickOutsideDirective,
    ConfirmDeleteModalComponent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) paginationParams!: {
    currentPage: number;
    total: number;
    limit: number;
  };
  @Input({ required: true }) totalPages!: number;
  @Input({ required: true }) signal!: WritableSignal<ApiSignal<User[]>>;
  @Input({ required: true }) confirmDelete: boolean = false;
  @Output() confirmDeleteChange = new EventEmitter<boolean>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  showDropDown: boolean[] = [];
  userActionsService = inject(UserActionsService);
  userActivationSignal = newSignal<{}>();
  destroyer$ = new Subject<void>();
  query = '';

  ngOnInit() {
    this.showDropDown = Array(this.paginationParams.limit).fill(false);
  }

  initials(username: string) {
    return getInitials(username);
  }

  handleSearch(event: Event) {
    event.preventDefault();
    this.query = '';
  }

  toggleDropdown(e: Event, index: number) {
    e.stopPropagation();
    this.showDropDown = this.showDropDown.map((b, i) =>
      i === index ? (b = !b) : (b = false)
    );
  }

  toggleUser(e: boolean, user: User) {
    pendSignal(this.userActivationSignal);
    this.userActionsService
      .toggleUserActivation(e, user.id)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: (res) => {
          completeSignal(this.userActivationSignal, res);
        },
        error: (err) => {
          errorSignal(this.userActivationSignal, err);
        },
      });
  }

  ngOnDestroy() {
    this.destroyer$.next();
  }
}
