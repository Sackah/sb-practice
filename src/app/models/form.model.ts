import { SBBlock } from './block.model';
import { SBColorScheme } from './colorScheme';
import { SBImage } from './image.model';
import { SBTitle } from './title.model';

/**
 * Upon form initialization, the form will have a single block with a single question and
 * a title with default value.
 */
export class SBForm {
  title = new SBTitle();

  blocks: SBBlock[] = [];

  logo = new SBImage();

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

  colorScheme = new SBColorScheme();

  constructor() {
    this.blocks.push(new SBBlock());
  }
}
