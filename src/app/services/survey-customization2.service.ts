import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type FormType = 'email' | 'heading' | 'title' | 'unknown';

@Injectable({
  providedIn: 'root',
})
export class SurveyCustomization2Service {
  private dataSource = new BehaviorSubject<FormType>('unknown');
  data = this.dataSource.asObservable();

  constructor() {}

  addForm(data: FormType) {
    this.dataSource.next(data);
  }
}
