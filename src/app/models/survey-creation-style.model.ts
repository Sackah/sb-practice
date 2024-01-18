export class SBSurveyCreationStyle {
  bold: boolean = false;
  italic: boolean = false;
  underline: boolean = false;
  strikethrough: boolean = false;
  quote: boolean = false;
  list: 'bullet | number' | null = null;
  link?: string;
  image?: File;

  constructor() {}
}
