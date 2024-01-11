import { SBEmail } from './email.model';
import { SBMultiSelect } from './multiple-choice.model';
import { SBName } from './name.model';
import { SBPhoneNumber } from './phone.model';
import { SBSingleSelect } from './single-select.model';

export class SBSection {
  // @ts-ignore
  title: {
    mainText: string;
    subText: string;
  };
  // @ts-ignore
  questions: (
    | SBEmail
    | SBName
    | SBSingleSelect
    | SBPhoneNumber
    | SBMultiSelect
  )[];

  constructor(
    questions: any,
    title = {
      mainText: 'Section 1',
      subText: 'Lorem lorem lorem lorem',
    }
  ) {
    this.title = title;
    this.questions = questions || [new SBEmail(), new SBName()];
  }
}
