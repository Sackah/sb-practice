import { SBQuestionStyle } from './question-styles.model';

export type QuestionType =
  | 'multiple-choice'
  | 'checkbox'
  | 'dropdown'
  | 'short-text'
  | 'paragraph'
  | 'single-choice';

export class SBQuestion {
  title: {
    detail: string;
    style: SBQuestionStyle;
  };
  type: QuestionType;
  tag?: string;
  required = false;
  options: string[] = [];
  /**
   * Option property only applies for checkbox instances
   */
  option: string = '';
  answers: string | string[] = '';

  constructor(
    title = 'Untitled Question',
    type: QuestionType,
    options?: string[],
    tag?: string,
    option?: string
  ) {
    this.title = {
      detail: title,
      style: new SBQuestionStyle(),
    };
    this.type = type;
    if (type === 'multiple-choice') {
      this.answers = [];
    }
    this.tag = tag;
    options?.forEach((option) => this.options.push(option));
    if (option) {
      this.option = option;
    }
  }
}

/**
 * Mockups
 */

//with nested question:
/* export class SBQuestion {
  title: {
    detail: string;
    style: SBQuestionStyle;
  };
  type: QuestionType;
  tag?: string;
  required = false;
  options: { option: string; conditionalQuestions: SBQuestion[] }[] = [];
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
    options?.forEach((option) => this.options.push({ option, conditionalQuestions: [] })); 
  }
} */

// with execution instructions
/* export class SBQuestion {
  title: {
    detail: string;
    style: SBQuestionStyle;
  };
  type: QuestionType;
  tag?: string;
  required = false;
  options: { option: string; conditionalQuestions: SBQuestion[] }[] = [];
  answers: string | string[] = '';
  navigationInstructions: { [option: string]: string } = {}; 

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
    options?.forEach((option) => {
      this.options.push({ option, conditionalQuestions: [] });
      this.navigationInstructions[option] = ''; // Initialize with no instruction
    });
  }
} */
