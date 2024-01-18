import { SBBlock } from './block.model';
import { SBImage } from './image.model';
import { SBTitle } from './title.model';

/**
 * Upon form initialization, the form will have a single block with a single question and
 * a title with default value.
 */
export class SBForm {
  title = new SBTitle();

  blocks: SBBlock[] = [];

  logo: SBImage | null = null;

  general = {
    title: '',
    logo: null,
    logoUrl: '',
    language: '',
  };

  welcomeSuccess = {
    welcomeMessage: '',
    successMessage: '',
  };

  notification = {
    notificationTitle: '',
  };

  team = {
    teamTitle: '',
    teamName: '',
    teamEmail: '',
    teamPhone: '',
  };

  styles = {
    colors: {
      pageColor: '',
      pageImage: '',
      formColor: '',
      formImage: '',
      fontColor: '',
      inputBg: '',
    },
    styles: {
      fontFamily: '',
      fontSize: '',
      formWidth: '',
      labelAlignment: '',
      questionSpacing: '',
      labelWidth: '',
    },
    themes: {},
    layouts: '',
  };

  constructor() {
    this.blocks.push(new SBBlock());
  }
}
