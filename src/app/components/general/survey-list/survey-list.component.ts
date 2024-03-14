import { Component, Input, OnInit, inject } from '@angular/core';
import { Survey } from '../../../pages/filter-page/static';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss',
})
export class SurveyListComponent implements OnInit {
  @Input() surveys: Survey[] = [];
  filterService = inject(FilterService);

  ngOnInit() {
    this.filterService.filter.subscribe();
  }
}
