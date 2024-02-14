import { SBQuestionStyle } from './question-styles.model';
import { SBQuestion } from './question.model';

export class SBBlock {
  title: {
    detail: string;
    style: SBQuestionStyle;
  };

  questions: SBQuestion[] = [];

  metadata: { [key: string]: number } = {};

  constructor(title = 'Untitled Block') {
    this.title = {
      detail: title,
      style: new SBQuestionStyle(),
    };
    const mcq = new SBQuestion('Untitled Question', 'multiple-choice');
    mcq.options = [
      {
        option: 'option 1',
        conditionalQuestions: [],
      },
    ];
    this.questions.push(mcq);
  }
}
