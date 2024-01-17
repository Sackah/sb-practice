export class SBSingleSelect {
  question: string;
  answer?: string;
  options: { option: string; selected: boolean }[];
  type = 'single-select';

  constructor(
    question: string = 'label',
    options = [
      { option: 'option 1', selected: false },
      { option: 'option 2', selected: false },
      { option: 'option 3', selected: false },
    ]
  ) {
    this.question = question;
    this.options = options;
  }
}
