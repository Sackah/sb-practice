import { SBEmail } from './email.model';
import { SBMultiSelect } from './multiple-choice.model';
import { SBName } from './name.model';
import { SBPhone } from './phone.model';
import { SBSingleSelect } from './single-select.model';

export class SBSection {
  // @ts-ignore
  title: {
    mainText: string;
    subText: string;
  };
  // @ts-ignore
  questions: (SBEmail | SBName | SBSingleSelect | SBPhone | SBMultiSelect)[];

  constructor(
    questions: any,
    title = {
      mainText: 'Form Title',
      subText: 'Lorem lorem lorem lorem lorem',
    }
  ) {
    this.title = title;
    this.questions = questions || [new SBEmail(), new SBName()];
  }
}
