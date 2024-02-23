import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filter$ = new Subject<(category: string) => boolean>();
  filter = this.filter$.asObservable();

  changeFilter(filter: (category: string) => boolean) {
    this.filter$.next(filter);
  }
}
