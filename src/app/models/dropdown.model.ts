export class SBDropdown {
  question: string;
  answer?: string;
  type = 'dropdown';

  constructor(question: string = 'label') {
    this.question = question;
  }
}
