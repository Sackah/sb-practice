export class SBMultiSelect {
  question: string;
  answer?: string;
  options: { option: string; selected: boolean }[];
  type = 'multi-select';

  constructor(
    question: string = 'Select a lot',
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
