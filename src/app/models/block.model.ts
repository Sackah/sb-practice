import { SBQuestionStyle } from './question-styles.model';
import { SBQuestion } from './question.model';

export class SBBlock {
  title: {
    detail: string;
    style: SBQuestionStyle;
  };

  questions: SBQuestion[] = [];

  constructor(title = 'Untitled Block') {
    this.title = {
      detail: title,
      style: new SBQuestionStyle(),
    };
    const mcq = new SBQuestion('Untitled Question', 'multiple-choice');
    mcq.options = ['option 1'];
    this.questions.push(mcq);
  }
}
