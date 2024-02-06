export class SBColorScheme {
  textColor: string | undefined;
  backgroundColor: string | undefined;

  constructor(textColor?: string, backgroundColor?: string) {
    this.textColor = textColor;
    this.backgroundColor = backgroundColor;
  }
}
