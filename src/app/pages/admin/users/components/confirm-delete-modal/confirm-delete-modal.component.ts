import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { UserActionsService } from '../../../../../services/admin/user-action/user-actions.service';
import { User } from '../../../../../State/authentication/auth.state';

@Component({
  selector: 'app-admin-confirm-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.scss',
})
export class ConfirmDeleteModalComponent {
  @Input({ required: true }) open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() deleteUser = new EventEmitter<User>();
  userActionsService = inject(UserActionsService);
  user = this.userActionsService.selectedUser();

  close() {
    this.open = false;
    this.openChange.emit(this.open);
  }
}
