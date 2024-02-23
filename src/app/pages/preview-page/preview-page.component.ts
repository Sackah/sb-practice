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
import { SBQuestion } from '../../models/question.model';

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
  conditionalQuestions: {
    [key: string]: { index: number; question: SBQuestion };
  } = {};

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
      for (let i = block.questions.length - 1; i >= 0; i--) {
        for (let j = block.questions[i].options.length - 1; j >= 0; j--) {
          const key = `${i}-${j}`; // Use question index and option index as key
          const ref = block.metadata[key];
          if (ref !== undefined) {
            const conditionalQuestion = block.questions[ref];
            if (conditionalQuestion) {
              this.conditionalQuestions[key] = {
                index: ref,
                question: conditionalQuestion,
              };
              conditionalQuestion.isConditional = true; // Set the isConditional property
              block.questions.splice(ref, 1);
            }
          }
        }
      }
    });
  }

  showConditionals(event: Event, questionIndex: number, optionIndex: number) {
    const { checked } = event.target as HTMLInputElement;

    // Remove all conditional questions first
    for (let key in this.conditionalQuestions) {
      const { question } = this.conditionalQuestions[key];
      const index = this.form.blocks[0].questions.findIndex(
        (q) => q === question
      );
      if (index !== -1) {
        this.form.blocks[0].questions.splice(index, 1);
      }
    }

    // If a radio button is checked, insert its related conditional questions
    if (checked) {
      const key = `${questionIndex}-${optionIndex}`;
      if (key in this.conditionalQuestions) {
        const { question } = this.conditionalQuestions[key];
        // Find the new index of the question that triggered the conditional question
        const newQuestionIndex = this.form.blocks[0].questions.findIndex(
          (q) => q === this.form.blocks[0].questions[questionIndex]
        );
        this.form.blocks[0].questions.splice(newQuestionIndex + 1, 0, question);
      }
    }
  }

  ngOnDestroy(): void {
    this.formChange.emit(this.initialForm);
    this.form = this.initialForm;
  }
}
