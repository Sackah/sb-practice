import { SBSurveyCreationStyle } from './survey-creation-style.model';

export class SBTitle {
  title: {
    detail: string;
    style: SBSurveyCreationStyle;
  };
  description: {
    detail: string;
    style: SBSurveyCreationStyle;
  };

  constructor(title: string = 'Survey Title', description: string = '') {
    this.title = {
      detail: title,
      style: new SBSurveyCreationStyle(),
    };
    this.description = {
      detail: description,
      style: new SBSurveyCreationStyle(),
    };
  }
}
