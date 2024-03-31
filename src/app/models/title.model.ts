import { SBQuestionStyle } from './question-styles.model';

export class SBTitle {
  title: {
    detail: string;
    style: SBQuestionStyle;
  };
  description: {
    detail: string;
    style: SBQuestionStyle;
  };

  constructor(title: string = 'Survey Title', description: string = '') {
    this.title = {
      detail: title,
      style: new SBQuestionStyle(),
    };
    this.description = {
      detail: description,
      style: new SBQuestionStyle(),
    };
  }
}
