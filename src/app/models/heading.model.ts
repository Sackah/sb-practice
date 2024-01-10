export class SBHeading {
  text: string;
  level: number;

  constructor(text: string = 'Heading', level: number = 1) {
    this.text = text;
    this.level = level;
  }
}
