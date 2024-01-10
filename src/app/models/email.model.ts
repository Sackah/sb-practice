export class SBEmail {
  question: string;
  answer?: string;
  type = 'email';

  constructor(question: string = 'label') {
    this.question = question;
  }
}
