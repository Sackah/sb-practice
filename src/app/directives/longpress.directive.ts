import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[longPress]',
  standalone: true,
})
export class LongpressDirective {
  longPressTimer: any;
  @Output() longPress = new EventEmitter();

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: any) {
    this.longPressTimer = setTimeout(() => this.longPress.emit(), 1000); // 1 second delay
  }

  @HostListener('touchend')
  onTouchEnd() {
    clearTimeout(this.longPressTimer);
  }
}
