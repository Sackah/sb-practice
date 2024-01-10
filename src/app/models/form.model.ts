import { SBHeading } from './heading.model';
import { SBSection } from './section.model';

export class SBForm {
  // @ts-ignore
  title: {
    mainText: string;
    subText: string;
  };

  // @ts-ignore
  heading: SBHeading[];

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

  constructor(
    title = { mainText: 'Form Title', subText: 'Lorem lorem lorem' },
    heading?: SBHeading,
    section?: SBSection
  ) {
    this.title = title;
    if (heading) this.heading = [heading];
    if (section) this.sections = [section];
  }
}
