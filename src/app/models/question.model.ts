import { SBQuestionStyle } from './question-styles.model';

export type QuestionType =
  | 'multiple-choice'
  | 'checkbox'
  | 'dropdown'
  | 'short-text'
  | 'paragraph';

export class SBQuestion {
  title: {
    detail: string;
    style: SBQuestionStyle;
  };
  type: QuestionType;
  tag?: string;
  required = false;
  options: string[] = [];
  answers: string | string[] = '';

  constructor(
    title = 'Untitled Question',
    type: QuestionType,
    options?: string[],
    tag?: string
  ) {
    this.title = {
      detail: title,
      style: new SBQuestionStyle(),
    };
    this.type = type;
    this.tag = tag;
    options?.forEach((option) => this.options.push(option));
  }
}
