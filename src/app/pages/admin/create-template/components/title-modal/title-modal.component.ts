import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-title-modal',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './title-modal.component.html',
  styleUrl: './title-modal.component.scss',
})
export class TitleModalComponent {
  constructor(private fb: FormBuilder, private toast: NgToastService) {}
  @Output() surveyTemplateDetails: EventEmitter<{
    title: string;
    category: string;
  }> = new EventEmitter<{
    title: string;
    category: string;
  }>();
  @Output() btnClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  surveyDetails = this.fb.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  SubmitDetails() {
    if (this.surveyDetails.invalid) {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Complete all Fields',
        duration: 2000,
      });
    } else {
      let title: string = this.surveyDetails.getRawValue().title!;
      let category: string = this.surveyDetails.getRawValue().category!;

      this.surveyTemplateDetails.emit({
        title,
        category,
      });
      this.closeModal()
    }
  }

  closeModal() {
    this.btnClose.emit(false)
  }
  stopPropagation(e: Event) {
    e.stopImmediatePropagation();
  }
}
