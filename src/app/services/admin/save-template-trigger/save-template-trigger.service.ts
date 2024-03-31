import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaveTemplateTriggerService {
  private triggerSave = new BehaviorSubject<boolean>(false);

  triggerSaveStatus = this.triggerSave.asObservable();

  setTriggerSave(data: boolean) {
    this.triggerSave.next(data);
  }
}
