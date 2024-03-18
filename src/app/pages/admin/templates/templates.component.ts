import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../../directives/clickoutside.directive';
import { TemplateActionsService } from '../../../services/admin/template-actions.service';
import {
  completeSignal,
  errorSignal,
  newSignal,
  pendSignal,
} from '../../../shared/utils';
import { SurveyTemplate, Template } from '../../../shared/types';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { PaginationComponent } from '../users/components/pagination/pagination.component';

@Component({
  selector: 'app-admin-templates',
  standalone: true,
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
  imports: [
    FormsModule,
    ClickOutsideDirective,
    TemplatesListComponent,
    PaginationComponent,
  ],
})
export class AdminTemplatesComponent implements OnInit {
  filterDropdown = false;
  query = '';
  tab: 'all' | 'deactivated' = 'all';
  private templateActionsService = inject(TemplateActionsService);
  templatesSignal = newSignal<SurveyTemplate[]>();
  paginationParams = signal({
    currentPage: 1,
    total: 100,
    limit: 10,
  });
  totalPages = computed(() =>
    Math.ceil(this.paginationParams().total / this.paginationParams().limit)
  );

  ngOnInit() {
    this.fetchTemplates();
  }

  prev() {
    if (this.templatesSignal().pending) {
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
    if (this.templatesSignal().pending) {
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
    if (this.templatesSignal().pending) {
      return;
    }
    switch (value) {
      case '... ':
        this.paginationParams.set({
          ...this.paginationParams(),
          currentPage: 1,
        });
        this.fetchTemplates();
        break;
      case ' ...':
        this.paginationParams.set({
          ...this.paginationParams(),
          currentPage: this.totalPages(),
        });
        this.fetchTemplates();
        break;
      default:
        if (typeof value === 'number') {
          this.paginationParams.set({
            ...this.paginationParams(),
            currentPage: value,
          });
          this.fetchTemplates();
        }
        break;
    }
  }

  fetchTemplates() {
    const { currentPage, limit } = this.paginationParams();
    pendSignal(this.templatesSignal);
    this.templateActionsService
      .getTemplates(currentPage, limit, this.tab)
      .subscribe({
        next: (data) => {
          completeSignal(this.templatesSignal, data);
        },
        error: (err) => {
          errorSignal(this.templatesSignal, err);
        },
      });
  }
}
