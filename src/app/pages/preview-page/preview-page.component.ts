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
      for (let i = 0; i < block.questions.length; i++) {
        for (let j = 0; j < block.questions[i].options.length; j++) {
          const key = `${i}-${j}`; // Use question index and option index as key
          const ref = block.metadata[key];
          if (ref !== undefined) {
            const conditionalQuestion = block.questions[ref];
            if (conditionalQuestion) {
              this.conditionalQuestions[key] = {
                index: ref,
                question: conditionalQuestion,
              };
              block.questions.splice(ref, 1);
            }
          }
        }
      }
    });
  }

  showConditionals(questionIndex: number, optionIndex: number) {
    const key = `${questionIndex}-${optionIndex}`;
    if (key in this.conditionalQuestions) {
      // Retrieve the conditional question
      const { question } = this.conditionalQuestions[key];
      // Check if the conditional question is already in the questions array
      const index = this.form.blocks[0].questions.findIndex(
        (q) => q === question
      );
      if (index === -1) {
        // If the conditional question is not in the questions array, insert it
        this.form.blocks[0].questions.splice(questionIndex + 1, 0, question);
      } else {
        // If the conditional question is in the questions array, remove it
        this.form.blocks[0].questions.splice(index, 1);
      }
    }
  }

  ngOnDestroy(): void {
    this.formChange.emit(this.initialForm);
    this.form = this.initialForm;
  }
}
