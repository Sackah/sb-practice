import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserActionsService } from '../../../services/admin/user-actions.service';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {
  completeSignal,
  errorSignal,
  getInitials,
  newSignal,
  pendSignal,
} from '../../../shared/utils';
import { ClickOutsideDirective } from '../../../directives/clickoutside.directive';
import { SurveyTemplate } from '../../../shared/types';
import { TemplateListComponent } from './components/template-list/template-list.component';

@Component({
  selector: 'app-admin-user-details',
  standalone: true,
  imports: [FormsModule, ClickOutsideDirective, TemplateListComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class AdminUserDetailsComponent implements OnInit, OnDestroy {
  userActionsService = inject(UserActionsService);
  user = this.userActionsService.selectedUser();
  templatesSignal = newSignal<SurveyTemplate[]>();
  destroyer$ = new Subject<void>();
  query = '';
  filterDropdown = false;

  ngOnInit() {
    this.fetchTemplates();
  }

  fetchTemplates() {
    pendSignal(this.templatesSignal);
    if (this.user)
      this.userActionsService
        .getTemplates(this.user.id)
        .pipe(takeUntil(this.destroyer$))
        .subscribe({
          next: (data) => {
            completeSignal(this.templatesSignal, data);
          },
          error: (err) => {
            errorSignal(this.templatesSignal, err);
          },
        });
  }

  initials(username: string | undefined) {
    if (username) {
      return getInitials(username);
    } else return '';
  }

  ngOnDestroy() {
    this.destroyer$.next();
  }
}
