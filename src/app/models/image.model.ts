export class SBImage {
  url: string;

  constructor(url: string = '') {
    this.url = url;
  }

  changeUrl(url: string) {
    this.url = url;
  }
}
