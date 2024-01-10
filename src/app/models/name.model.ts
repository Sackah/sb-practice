export class SBName {
  question: string;
  answer?: string;
  type = 'name';

  constructor(question: string = 'label') {
    this.question = question;
  }
}
