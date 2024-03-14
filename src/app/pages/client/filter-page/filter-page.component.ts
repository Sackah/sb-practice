import { Component, inject } from '@angular/core';
import { Survey, Surveys } from './static';
import { SurveyListComponent } from '../../../components/general/survey-list/survey-list.component';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-filter-page',
  standalone: true,
  templateUrl: './filter-page.component.html',
  styleUrl: './filter-page.component.scss',
  imports: [SurveyListComponent],
})
export class FilterPageComponent {
  surveys = Surveys;
  filterService = inject(FilterService);
  filter = (category: Survey) => true;

  checkedCategories: string[] = [];

  changeFilter(event: Event, category: string) {
    if ((event.target as HTMLInputElement)?.checked) {
      this.checkedCategories.push(category);
    } else {
      const index = this.checkedCategories.indexOf(category);
      if (index !== -1) {
        this.checkedCategories.splice(index, 1);
      }
    }
    this.filter = (survey) =>
      this.checkedCategories.length === 0 ||
      this.checkedCategories.includes(survey.category);
  }

  get visibleSurveys() {
    return this.surveys.filter(this.filter);
  }
}
