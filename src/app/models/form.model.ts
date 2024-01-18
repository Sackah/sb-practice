import { SBHeading } from './heading.model';
import { SBBlock } from './block.model';
import { SBTitle } from './title.model';

export class SBForm {
  // @ts-ignore
  title: SBTitle;

  // @ts-ignore
  sections: SBSection[];

  // @ts-ignore
  general?: {
    title: string;
    logo: string;
    logoUrl: string;
    language: string;
  };

  // @ts-ignore
  welcomeSuccess?: {
    welcomeMessage: string;
    successMessage: string;
  };

  // @ts-ignore
  notification?: {
    notificationTitle: string;
  };

  // @ts-ignore
  team?: {
    teamTitle: string;
    teamName: string;
    teamEmail: string;
    teamPhone: string;
  };

  styles?: {
    colors: {
      pageColor: string;
      pageImage: string;
      formColor: string;
      formImage: string;
      fontColor: string;
      inputBg: string;
    };
    styles: {
      fontFamily: string;
      fontSize: string;
      formWidth: string;
      labelAlignment: 'left' | 'top' | 'right' | 'bottom';
      questionSpacing: string;
      labelWidth: string;
    };
    themes: {};
    layouts: 'classic' | 'card';
  };

  constructor(title: SBTitle = new SBTitle(), block?: SBBlock[], styles?: any) {
    this.title = title;
    if (block) this.sections = block;
    if (styles) this.styles = styles;
  }
}
