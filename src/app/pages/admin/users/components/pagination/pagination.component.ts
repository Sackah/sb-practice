import {
  Component,
  EventEmitter,
  Output,
  computed,
  input,
} from '@angular/core';
import { getPaginationRange } from '../../../../../shared/utils';

@Component({
  selector: 'app-admin-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  @Output() pageChange = new EventEmitter<number | string>();
  private sibblings = 1;

  pagesArr = computed(() =>
    getPaginationRange(this.totalPages(), this.currentPage(), this.sibblings)
  );
}
