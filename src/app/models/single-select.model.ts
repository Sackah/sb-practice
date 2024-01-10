export class SBSingleSelect {
  question: string;
  answer?: string;
  options: string[];
  type = 'single-select';

  constructor(
    question: string = 'label',
    options: string[] = ['option 1', 'option 2', 'option 3']
  ) {
    this.question = question;
    this.options = options;
  }
}
