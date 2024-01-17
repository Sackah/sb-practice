import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SBMultiSelect } from '../../models/multiple-choice.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multiple-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multiple-select.component.html',
  styleUrl: './multiple-select.component.scss',
})
export class MultipleSelectComponent {
  @Input() select!: SBMultiSelect | any;
  @Output() optionsChange = new EventEmitter<SBMultiSelect>();

  onEmailTextChange() {
    this.optionsChange.emit(this.select);
    console.log(this.select);
  }
}
