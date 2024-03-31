import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionType } from '../models/question.model';
import { TextSizes } from '../components/general/side-bar/sizes';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  private style = new BehaviorSubject<{
    type: string;
    value: TextSizes;
  } | null>(null);
  currentStyle = this.style.asObservable();

  changeStyle(style: { type: string; value: TextSizes } | null) {
    this.style.next(style);
  }
}
