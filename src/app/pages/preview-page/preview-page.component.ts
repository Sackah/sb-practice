import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { SBForm } from '../../models/form.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-page.component.html',
  styleUrls: [
    './preview-page.component.scss',
    '../../components/styles/text.styles.scss',
  ],
})
export class PreviewPageComponent implements OnInit, OnDestroy {
  @Input() form!: SBForm;
  @Output() formChange = new EventEmitter<SBForm>();
  initialForm!: SBForm;
  listOfConditionals: { [key: string]: boolean } = {};

  ngOnInit(): void {
    this.initialForm = JSON.parse(JSON.stringify(this.form));
    this.setupConditionals();
  }

  get titleStyle() {
    return {
      title: true,
      'text-base': true,
      'text-bold': this.form.title.title.style.bold,
      'text-italic': this.form.title.title.style.italic,
      'text-large': this.form.title.title.style.large,
    };
  }

  get descriptionStyle() {
    return {
      desc: true,
      'text-base': true,
      'text-bold': this.form.title.description.style.bold,
      'text-italic': this.form.title.description.style.italic,
      'text-large': this.form.title.description.style.large,
    };
  }

  clg() {
    console.log(this.form);
  }

  setupConditionals() {
    this.form.blocks.forEach((block) => {
      for (let i = 0; i < block.questions.length; i++) {
        for (let j = 0; j < block.questions[i].options.length; j++) {
          const key = `${i}-${j}`; // Use question index and option index as key
          const ref = block.metadata[key];
          if (ref !== undefined) {
            const conditionalQuestion = block.questions[ref];
            if (conditionalQuestion) {
              block.questions[i].options[j].conditionalQuestions.push(
                conditionalQuestion
              );
              block.questions.splice(ref, 1);
            }
          }
        }
      }
    });
  }

  showConditionals(questionIndex: number, optionIndex: number) {
    const key = `${questionIndex}-${optionIndex}`;
    this.listOfConditionals[key] = !this.listOfConditionals[key];
  }

  ngOnDestroy(): void {
    this.formChange.emit(this.initialForm);
    this.form = this.initialForm;
  }
}
