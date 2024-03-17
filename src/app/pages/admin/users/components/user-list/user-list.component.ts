import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  input,
} from '@angular/core';
import { User } from '../../../../../store/user';
import { SwitchComponent } from '../../../../../components/ui/switch/switch.component';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../../../directives/clickoutside.directive';
import { getInitials } from '../../../../../shared/utils';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { UserActionsService } from '../../../../../services/admin/user-actions.service';
import { RouterLink } from '@angular/router';

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
})
export class UserListComponent {
  users = input.required<User[]>();
  @Input() confirmDelete: boolean = false;
  @Output() confirmDeleteChange = new EventEmitter<boolean>();
  limit = 10;
  query = '';
  showDropDown: boolean[] = Array(this.limit).fill(false);
  userActionsService = inject(UserActionsService);

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
}
