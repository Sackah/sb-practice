export class SBPhoneNumber {
  question: string;
  answer?: string;
  type = 'phone-number';

  constructor(question: string = 'label') {
    this.question = question;
  }
}
