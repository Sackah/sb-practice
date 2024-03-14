import {
  ComponentRef,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DropdownComponent } from './dropdown.component';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private injector: Injector) {}
  private ref: ComponentRef<DropdownComponent> | undefined;

  open(
    content: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
    position: { top: number; left: number },
    event: MouseEvent
  ): ComponentRef<DropdownComponent> {
    const contentViewRef = content.createEmbeddedView(null);
    const dropdownComponentRef = viewContainerRef.createComponent(
      DropdownComponent,
      {
        injector: this.injector,
        projectableNodes: [[...contentViewRef.rootNodes]],
      }
    );
    const triggerElement = event.target as HTMLElement;
    const rect = triggerElement.getBoundingClientRect();
    const newPosition = {
      top: rect.top + window.scrollY + position.top,
      left: rect.left + window.scrollX + position.left,
    };
    dropdownComponentRef.instance.position = newPosition;
    event.stopPropagation();
    dropdownComponentRef.instance.closeEvent.subscribe(() =>
      this.closeDropdown(dropdownComponentRef)
    );
    this.ref = dropdownComponentRef;
    return dropdownComponentRef;
  }

  closeDropdown(dropdownComponentRef: ComponentRef<DropdownComponent>) {
    dropdownComponentRef.destroy();
  }

  public close() {
    if (this.ref) {
      this.closeDropdown(this.ref);
    }
  }
}
