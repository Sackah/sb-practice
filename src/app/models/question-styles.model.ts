export class SBQuestionStyle {
  bold: boolean = false;
  italic: boolean = false;
  large: boolean = false;
  underline: boolean = false;
  strikethrough: boolean = false;
  size:
    | '12'
    | '14'
    | '16'
    | '18'
    | '20'
    | '22'
    | '24'
    | '26'
    | '28'
    | '30'
    | '32' = '12';
  quote: boolean = false;
  list: 'bullet | number' | null = null;
  link?: string;
  linkText?: string;
  image?: File;

  constructor() {}
}
