import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../../../../../store/user';
import { UserActionsService } from '../../../../../services/admin/user-actions.service';

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
