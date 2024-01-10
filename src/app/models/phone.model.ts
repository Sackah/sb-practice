export class SBPhone {
  question: string;
  answer?: string;

  constructor(question: string = 'label') {
    this.question = question;
  }
}
