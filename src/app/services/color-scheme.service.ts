import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SBColorScheme } from '../models/colorScheme';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private colorScheme = new BehaviorSubject<SBColorScheme | undefined>(
    undefined
  );
  currentColorScheme = this.colorScheme.asObservable();

  constructor() {}

  change(colorScheme: SBColorScheme) {
    this.colorScheme.next(colorScheme);
  }
}
