import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  // @Input() currentPage: number = 1;
  // @Input() totalPages: number = 1;
  // @Output() pageChange = new EventEmitter<number>();

  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.pageChange.emit(this.currentPage);
  //   }
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.pageChange.emit(this.currentPage);
  //   }
  // }

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
