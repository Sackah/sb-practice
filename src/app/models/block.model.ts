import { SBEmail } from './email.model';
import { SBMultiSelect } from './multiple-choice.model';
import { SBName } from './name.model';
import { SBPhoneNumber } from './phone.model';
import { SBSingleSelect } from './single-select.model';

export class SBBlock {
  // @ts-ignore
  title: string;
  // @ts-ignore
  questions: (
    | SBEmail
    | SBName
    | SBSingleSelect
    | SBPhoneNumber
    | SBMultiSelect
  )[];

  constructor(questions: any, title = 'Untitled Block') {
    this.title = title;
    this.questions = questions || [new SBEmail(), new SBName()];
  }
}
