import { SBQuestionStyle } from './question-styles.model';

type QuestionType =
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
  options?: string[];
  answers: string | string[] = '';

  constructor(
    title = 'Untitled Question',
    type: QuestionType,
    tag?: string,
    options?: string[]
  ) {
    this.title = {
      detail: title,
      style: new SBQuestionStyle(),
    };
    this.type = type;
    this.tag = tag;
    this.options = options;
  }
}
